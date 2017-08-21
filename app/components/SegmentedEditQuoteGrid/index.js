/**
*
* SegmentedSegmentedEditQuoteGrid
*
*/
import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import SegmentSubComponent from 'components/SegmentSubComponent';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import { browserHistory } from 'react-router';

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
        collapseOnDataChange: true,
        filterable: false,
        sortable: true,
        resizable: false,
        pivot: true,
        expander: true,
        freezeWhenExpanded: true,
        selectedLine: {},
      },
      data: this.props.data,
      isModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.cloneLine = this.cloneLine.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
    this.renderChecbox = this.renderChecbox.bind(this);
    this.renderCell = this.renderCell.bind(this);
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
  renderCell(index,e) {
    let row = <span>asdkh</span>;
    return(<span title='to be done'>{e.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>)
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
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span> {this.props.currency} {cellInfo.value}</span>);
    } else {
      return (<div>
        <InlineEdit
           className="table-edit"
           activeClassName="table-edit-input"
           text={cellInfo.value}
           paramName="message"
        />
        <Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
        {/* <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div> */}
      </div>);
    }
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.isProductOption) {
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
        width: 150,

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
        Header: () => <span title="PRODUCT CODE">PRODUCT CODE</span>,
        accessor: 'code',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
      },

      {
        Header: () => <span title="PRODUCT NAME">PRODUCT NAME</span>,
        accessor: 'name',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
      }];
    const data = Object.assign({}, this.props.data[0]);
    data.segmentData.columns.map((i, index) => (
      columns.push({
        Header: () => <span className="upper-case" title={i.name}>{i.name}</span>,
        accessor: `segmentData.columns[${index}].netTotal`,
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        className: 'table-edit',
        Cell: this.renderCell.bind(this,index),
      })
    ));
    columns.push({
      Header: () => <span className="upper-case" title="NET TOTAL">NET TOTAL</span>,
      accessor: 'netTotal',
      id: 'netTotal',
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      className: 'table-edit',
    });
    return columns;
  }

  renderActionItems(cellInfo) {
    const discount = cellInfo.original.canShowDiscountScheduler ? <a><Glyphicon glyph="calendar" onClick={this.handleToggle.bind(this, cellInfo.index)} /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push('/reconfigureproducts'); }}><Glyphicon glyph="wrench" /></a> : '';
    const bundle = cellInfo.original.isBundled ? <a><Glyphicon glyph="info-sign" /></a> : '';
    const clone = cellInfo.original.canClone ? <a onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment} title="segment/desegment"><Glyphicon glyph="transfer" /></a> : '';
    return (
      <div className="actionItems" >
        {/* <a><Glyphicon glyph="star-empty" /></a> */}
        {bundle}
        {discount}
        {reconfigure}
        {cellInfo.original.isProductOption ? <span></span> : clone}
        {cellInfo.original.isProductOption ? <span></span> : <a onClick={this.deleteLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="trash" /></a>}
        {segment}
      </div>
    );
  }

  render() {
    const data = this.props.data;
    const columns = this.renderColumns();
    return (
      <div>
        <div className="table-wrap">
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
                currency = {this.props.currency}
                updateSeg={this.props.updateSeg}
                updateSegBundle={this.props.updateSegBundle}
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
      </div>
    );
  }
}

SegmentedEditQuoteGrid.propTypes = {
  data: PropTypes.any,
  currency: PropTypes.any,
  deleteLine: PropTypes.func,
  cloneLine: PropTypes.func,
  toggleAllCheckBox: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
};

export default SegmentedEditQuoteGrid;
