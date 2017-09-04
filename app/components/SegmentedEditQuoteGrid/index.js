import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
import { RIEInput } from 'riek';
import _ from 'lodash';
import SegmentSubComponent from 'components/SegmentSubComponent';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import CustomSegmentsModal from '../CustomSegmentsModal';
import messages from './messages';

class SegmentedEditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
      },
      data: this.props.data,
      isModalOpen: false,
      isCustomModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.cloneLine = this.cloneLine.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
    this.renderChecbox = this.renderChecbox.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
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
        isModalOpen: !this.state.isModalOpen,
        selectedLine: selectedData.discountSchedule,
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
    const reconfigure = cellInfo.original.canReconfigure ? <a title={this.context.intl.formatMessage({ ...messages.recongifure })} className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push(`/reconfigureproducts?id=${cellInfo.original.id}&quoteId=${this.props.quoteData.id}&priceBookId=${this.props.quoteData.priceBookId}`); }}><Glyphicon glyph="wrench" /></a> : <span className="blank"></span>;
    // const bundle = cellInfo.original.isBundled ? <a  title={`Required by ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> : '';
    // const clone = cellInfo.original.canClone ? <a onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a onClick={this.seg.bind(this, cellInfo)} title="Desegment"><Glyphicon glyph="transfer" /></a> : '';
    return (
      <div className="actionItems" >
        {reconfigure}
        {segment}
      </div>
    );
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
    if (!cellInfo.original.isBundled) {
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
        Cell: (cellInfo) => (cellInfo.original.canShowDiscountScheduler ? <div><a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a> <span className="pro-name">{cellInfo.original.code}</span></div> : <span className="pro-name">{cellInfo.original.code}</span>),
      },

      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        width: 200,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: (cellInfo) => (cellInfo.original.isBundled ? <div><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name">{cellInfo.original.name}</span></div> : <span className="pro-name">{cellInfo.original.name}</span>),
      }];
    const data = Object.assign({}, this.props.data[0]);
    data.segmentData.columns.map((i, index) => (
      columns.push({
        Header: () => <span className="upper-case" title={i.name}>{i.name}</span>,
        accessor: `segmentData.columns[${index}].netTotal`,
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        className: 'table-edit',
        Cell: this.renderCell.bind(this, index),
      })
    ));
    columns.push({
      Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netTotal })}>{this.context.intl.formatMessage({ ...messages.netTotal })}</span>,
      accessor: 'netTotal',
      id: 'netTotal',
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      className: 'table-edit',
    });
    return columns;
  }
  renderCell(index, e) {
    const data = e.original.segmentData.columns[index];
    const tooltip = (
      <Tooltip id={`${e.original.id}-${e.original.segmentData.columns[index].name}`} bsClass="tooltip" className="hover-tip">
        <div className="lab">{this.context.intl.formatMessage({ ...messages.quantity })}</div><div className="val">{data.quantity.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.listPrice })}</div><div className="val">{this.props.currency} {data.listPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.uplift })}</div><div className="val">{this.props.currency} {data.uplift.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.additionalDiscount })}</div><div className="val">{data.additionalDiscount.value.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.netunitPrice })}</div><div className="val">{this.props.currency} {data.netunitPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
        <div className="lab">{this.context.intl.formatMessage({ ...messages.netTotal })}</div><div className="val">{this.props.currency} {data.netTotal.toLocaleString('en', { minimumFractionDigits: 2 })}</div><br />
      </Tooltip>
    );
    return (<OverlayTrigger placement="top" overlay={tooltip}>
      <span>{e.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
    </OverlayTrigger>);
  }
  renderTotal(cellInfo) {
    return (<span>{this.props.currency} {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>);
  }
  render() {
    const data = this.props.data;
    const columns = this.renderColumns();
    const total = this.calculateTotal();
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
        <DiscountScheduleEditor
          show={this.state.isModalOpen} onHide={this.handleToggle}
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
          selectedLine={this.props.data[0]}
          loadCustomSegmentsData={this.props.loadCustomSegmentsData}
          addCustomSegmentData={this.props.addCustomSegmentData}
          deleteCustomSegmentData={this.props.deleteCustomSegmentData}
          changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
          saveCustomSegmentData={this.props.saveCustomSegmentData}
          checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
          checkCustomSegmentData={this.props.checkCustomSegmentData}
          customSegments={this.props.customSegments}
        />
        <div className="sub-footer-seg upper-case">
          {total}
        </div>
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
  loadCustomSegmentsData: PropTypes.func,
  addCustomSegmentData: PropTypes.func,
  deleteCustomSegmentData: PropTypes.func,
  changeCustomSegmentFieldData: PropTypes.func,
  saveCustomSegmentData: PropTypes.func,
  checkAllCustomSegmentData: PropTypes.func,
  checkCustomSegmentData: PropTypes.func,
  customSegments: PropTypes.any,
  handleCustomModalToggle: PropTypes.func,
  quoteData: PropTypes.any,
};

export default SegmentedEditQuoteGrid;
