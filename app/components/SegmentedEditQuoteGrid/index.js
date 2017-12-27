import ReactTable from '../ReactTable';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap/lib';

import { RIEInput } from 'riek';
import _ from 'lodash';
import SegmentSubComponent from 'components/SegmentSubComponent';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import TermDiscountScheduleEditor from '../TermDiscountScheduleEditor';
import CustomSegmentsModal from '../CustomSegmentsModal';
import messages from './messages';

class SegmentedEditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderCommonDiscount = this.renderCommonDiscount.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTermToggle = this.handleTermToggle.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
    this.checkAll = this.checkAll.bind(this);

    this.state = {
      tableOptions: {
        loading: false,
        showPagination: false,
        showPageSizeOptions: false,
        showPageJump: false,
        collapseOnSortingChange: false,
        collapseOnPageChange: true,
        collapseOnDataChange: false,
        filterable: false,
        sortable: true,
        resizable: false,
        pivot: true,
        expander: true,
        defaultExpanded: {},
        freezeWhenExpanded: false,
        selectedLine: {},
        termDiscount: {},
      },
      data: this.props.data,
      isModalOpen: false,
      isModalOpen1: false,
      isCustomModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.cloneLine = this.cloneLine.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
    this.renderChecbox = this.renderChecbox.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
    this.onReconfigureLineClick = this.onReconfigureLineClick.bind(this);
  }
  onReconfigureLineClick(item) {
    const reconfigureObj = {
      id: item.id,
      reconfigured: true,
    };
    this.props.toggleReconfigureLineStatus(reconfigureObj);
    if (this.props.location.query.groupId !== null && this.props.location.query.groupId !== undefined && this.props.location.query.mainTab !== undefined && this.props.location.query.tab !== undefined) {
      browserHistory.push(`/reconfigureproducts?groupId=${this.props.location.query.groupId}&mainTab=2`);
    } else if ((this.props.location.query.groupId === null || this.props.location.query.groupId === undefined) && this.props.location.query.mainTab !== undefined) {
      browserHistory.push('/reconfigureproducts?mainTab=2');
    } else {
      browserHistory.push('/reconfigureproducts');
    }
  }
  setTableOption(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      tableOptions: {
        ...this.state.tableOptions,
        [name]: value,
      },
    });
  }
  handleToggle(index) {
    const selectedData = this.props.data[index];
    if (selectedData !== undefined) { 
      this.setState({
        isModalOpen1: !this.state.isModalOpen1,
        selectedLine: selectedData.discountSchedule,
      });
    } else {
      this.setState({
        isModalOpen1: !this.state.isModalOpen1,
      });
    }
  }

  handleTermToggle(index) {
    const selectedData = this.props.data[index];
    if (selectedData !== undefined) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        termDiscount: selectedData.termDiscountSchedule,
      });
    } else {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
  }

  cloneLine(id) {
    this.props.cloneLine(id);
  }
  deleteLine(id) {
    this.props.deleteLine(id);
  }
  checkAll(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i += 1) {
      if (!d[i].checked && e.target.checked) {
        d[i].click();
      } else if (d[i].checked && !e.target.checked) {
        d[i].click();
      }
    }
  }
  seg(cellInfo) {
    this.props.segment(cellInfo.original.id, false, cellInfo.original.isBundled, cellInfo.original.parent);
  }
  calculateTotal() {
    const columns = [
      {
        width: 35,
      },
      {
        width: 60,
      },
      {
        width: 50,
      },
      {
        width: 50,
      }, {
      },

      {
        style: { textAlign: 'left' },
        Cell: <span>{this.context.intl.formatMessage({ ...messages.subTotal })}:</span>,
      }];
    const total = [{ netTotal: 0 }];
    const netTotal = 'netTotal';
    _.forEach(this.props.data, (value) => {
      _.forEach(value.segmentData.columns, (row) => {
        if (!total[0][row.name]) {
          total[0][row.name] = row.netTotal;
        } else {
          total[0][row.name] += row.netTotal;
        }
      });
      if (!total[0][netTotal]) {
        total[0][netTotal] = value.netTotal;
      } else {
        total[0][netTotal] += value.netTotal;
      }
    });
    const keys = _.keys(total[0]);

    keys.push(keys.shift());
    keys.map((i) => (
      columns.push({
        accessor: `${i}`,
        id: `${i}`,
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderTotal.bind(this),
      })
     ));

    const table = (<ReactTable
      className="sub-component"
      data={total}
      columns={columns}
      defaultPageSize={1}
      pageSize={1}
      style={{ width: '100%' }}
      {...this.state.tableOptions}
    />);
    return table;
    // return total.map((i) => <div style={{width:'100px',display: 'inline-block'}}>{this.props.currency} {i}</div>);
  }
  renderActionItems(cellInfo) {
    // const discount = cellInfo.original.canShowDiscountScheduler ? <a><Glyphicon glyph="calendar" onClick={this.handleToggle.bind(this, cellInfo.index)} /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a title={this.context.intl.formatMessage({ ...messages.reconfigure })} className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { this.onReconfigureLineClick(cellInfo.original); }}><Glyphicon glyph="wrench" /></a> : '';
    // const bundle = cellInfo.original.isBundled ? <a  title={`Required by ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> : '';
    // const clone = cellInfo.original.canClone ? <a onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const notification = cellInfo.original.notificationMessages.length > 0 ? <a title={cellInfo.original.notificationMessages.map(item => item + "\n" )  } className={cellInfo.original.notificationMessages.length > 0 ? 'link' : 'disabled-link'}><Glyphicon glyph="bell" /></a>:'';
    const segment = cellInfo.original.canSegment ? <a onClick={this.seg.bind(this, cellInfo)} title="Resegment"><Glyphicon glyph="transfer" /></a> : '';
    
    return (
      <div className="actionItems" >
        {reconfigure}
        {segment}
        {notification}
      </div>
    );
  }

  renderCommonDiscount(cellInfo){
    if(cellInfo.original.canShowDiscountScheduler && (cellInfo.original.termDiscountSchedule !== null)){
      return(
        <div>
        <a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a>
        <a className="pro-icon" onClick={this.handleTermToggle.bind(this, cellInfo.index)} title={"Term Discount"}><Glyphicon glyph="tags" /></a>
        <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
        </div>
      );
    }
    else{
        if(cellInfo.original.canShowDiscountScheduler){
          return(
          <div>
          <a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a>
          <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
           </div>
          );
        }
        else{
          if(cellInfo.original.termDiscountSchedule !== null){
            return(
            <div>
              <a className="pro-icon" onClick={this.handleTermToggle.bind(this, cellInfo.index)} title={"Term Discount"}><Glyphicon glyph="tags" /></a>
              <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
           </div>
          );
          }
        }
    }
  }

  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span> {this.props.currency} {cellInfo.value}</span>);
    }
    return (<div>
      <div className="edit-icon"><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
      <RIEInput
        className="table-edit"
        classEditing="table-edit-input"
        value={cellInfo.value}
        propName="message"
      />
    </div>);
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.parentLineId) {
      return (<input type="checkbox" className="check" onChange={this.props.toggleQuoteCheckbox} value={cellInfo.original.id} />);
    }
    return (<span></span>);
  }
  renderColumns() {
    const columns = [
      {
        Header: '',
        style: { textAlign: 'left' },
        sortable: false,
        width: 60,

        Cell: this.renderActionItems,
      },
      {
        Header: <input type="checkbox" className="checkAll" onChange={this.checkAll} />,
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        Cell: this.renderChecbox,
      },
      {
        Header: '#',
        sortable: false,
        width: 50,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: ({ index }) => <span>{index + 1}</span>,

      }, {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productCode })}>{this.context.intl.formatMessage({ ...messages.productCode })}</span>,
        accessor: 'code',
        width: 200,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: this.renderCommonDiscount,
      }

      ];
    const data = Object.assign({}, this.props.data[0]);
    let segmentTotal = 0;
    _.forEach(this.props.data, (value) => {
      segmentTotal += value.segmentTotal;
    });
    columns.push(
        {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        Footer: (<span>Segmented {this.props.selectTab} Total</span>),
        width: 200,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: this.renderOverlay.bind(this), 
      //  (cellInfo) => (cellInfo.original.isRequired ? <div><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span></div> : <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span>),
      }
      );
    data.segmentData.columns.map((i, index) => {
      let total = 0;
      const c = this.props.data.map((j) => _.filter(j.segmentData.columns, { name: i.name }).map((d) => total += d.netTotal));
      
      if (!i.isDeleted) {
        columns.push({
          Header: () => <span className="upper-case" title={i.name}>{i.name}</span>,
          Footer: (<span className="table-edit table-edit-seg sub-footer-table">{total.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>),
          accessor: `segmentData.columns[${index}].netTotal`,
          style: { textAlign: 'right' },
          headerStyle: { textAlign: 'right' },
          className: '',
          Cell: this.renderCell.bind(this, index),
        });
      }
    });
    columns.push({
      Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netTotal })}>{this.context.intl.formatMessage({ ...messages.netTotal })}</span>,
      // /accessor: 'segmentTotal',
      Footer: (<span className="table-edit table-edit-seg sub-footer-table">{segmentTotal.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>),
      id: 'segmentTotal',
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      className: '',
      Cell: (cellInfo) => (<span className="table-edit table-edit-seg">{cellInfo.original.segmentTotal ? cellInfo.original.segmentTotal.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : 0 }</span>),
    });
    return columns;
  }
  renderOverlay(e) {
      const tooltip = (
      <Tooltip id={`${e.original.id}-${e.original.name}`} bsClass="tooltip" className="hover-tip">
      <div className="lab"><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${e.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name" title={e.original.name}>{e.original.name}</span></div>
        </Tooltip>
      );
      return (<OverlayTrigger placement="bottom" overlay={tooltip}>
      <span >{e.original.name}</span>
    </OverlayTrigger>);
    /*}else{
    <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span>
  }
    
        //<div >{this.context.intl.formatMessage({ ...messages.name })}</div><div className="val">{data.name}</div><br /> 
*/
  }
  renderCell(index, e) {
    const data = e.original.segmentData.columns[index];
    if (data.isOneTime === false && data.type === 'OneTime') {
      return (<span className="blank-before"></span>);
    }
    const tooltip = (
      <Tooltip id={`${e.original.id}-${e.original.segmentData.columns[index].name}`} bsClass="tooltip" className="hover-tip">
        <div className="lab">{this.context.intl.formatMessage({ ...messages.quantity })}</div><div className="val">{data.quantity.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.listPrice })}</div><div className="val">{this.props.currency} {data.listPrice.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.uplift })}</div><div className="val">{this.props.currency} {data.uplift.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.additionalDiscount })}</div><div className="val">{data.additionalDiscount.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.netunitPrice })}</div><div className="val">{this.props.currency} {data.netunitPrice.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.netTotal })}</div><div className="val">{this.props.currency} {data.netTotal.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</div><br />
      </Tooltip>
    );
    return (<OverlayTrigger placement="bottom" overlay={tooltip}>
      <span className="table-edit table-edit-seg">{e.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e.original.decimalsSupported ? e.original.decimalsSupported : 2 })}</span>
    </OverlayTrigger>);
  }
  renderTotal(cellInfo) {
    return (<span className="table-edit table-edit-seg">{this.props.currency} {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })}</span>);
  }
  render() {
    const data = this.props.data;
    const columns = this.renderColumns();
    // const total = this.calculateTotal();
    return (
      <div>
        <div className="table-wrap edit-grid-segment">
          <ReactTable
            className="-striped -highlight"
            data={data}
            columns={columns}
            defaultPageSize={data.length}
            pageSize={data.length}
            style={{ width: '100%' }}
            {...this.state.tableOptions}
            SubComponent={(row) => (
              <SegmentSubComponent
                data={_.filter(this.props.data, { id: row.original.id })[0]}
                currency={this.props.currency}
                updateSeg={this.props.updateSeg}
                updateSegBundle={this.props.updateSegBundle}
                updateSegSelect={this.props.updateSegSelect}
                updateSegBundleSelect={this.props.updateSegBundleSelect}
              />
            )}
          />
        </div>
        <TermDiscountScheduleEditor
          show={this.state.isModalOpen} onHide={this.handleTermToggle}
          style={{
            display: 'inline-flex',
          }}
          value={this.state.value}
          termDiscount={this.state.termDiscount}
        />
        <DiscountScheduleEditor
          show={this.state.isModalOpen1} onHide={this.handleToggle}
          style={{
            display: 'inline-flex',
          }}
          value={this.state.value}
          selectedLine={this.state.selectedLine}
        />
        <CustomSegmentsModal
          showModal={this.props.isCustomModalOpen}
          onHide={this.props.handleCustomModalToggle}
          style={{
            display: 'inline-flex',
          }}
          customLines={this.props.data}
          addCustomSegmentData={this.props.addCustomSegmentData}
          deleteCustomSegmentData={this.props.deleteCustomSegmentData}
          changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
          saveCustomSegmentData={this.props.saveCustomSegmentData}
          checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
          checkCustomSegmentData={this.props.checkCustomSegmentData}
          customSegments={this.props.customSegments}
          quoteData={this.props.quoteData}
          toggleCheckAll={this.props.toggleCheckAll}
          isCheckAll={this.props.isCheckAll}
        />
        {/* <div className="sub-footer-seg upper-case">
          {total}
        </div> */}
      </div>
    );
  }
}
SegmentedEditQuoteGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
SegmentedEditQuoteGrid.propTypes = {
  data: PropTypes.any,
  currency: PropTypes.any,
  deleteLine: PropTypes.func,
  cloneLine: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
  segment: PropTypes.func,
  updateSegBundle: PropTypes.func,
  updateSeg: PropTypes.func,
  updateSegSelect: PropTypes.func,
  updateSegBundleSelect: PropTypes.func,
  isCustomModalOpen: PropTypes.any,
  addCustomSegmentData: PropTypes.func,
  deleteCustomSegmentData: PropTypes.func,
  changeCustomSegmentFieldData: PropTypes.func,
  saveCustomSegmentData: PropTypes.func,
  checkAllCustomSegmentData: PropTypes.func,
  checkCustomSegmentData: PropTypes.func,
  customSegments: PropTypes.any,
  handleCustomModalToggle: PropTypes.func,
  quoteData: PropTypes.any,
  toggleCheckAll: PropTypes.func,
  isCheckAll: PropTypes.any,
  location: PropTypes.any,
  toggleReconfigureLineStatus: PropTypes.func,
};

export default SegmentedEditQuoteGrid;
