/**
*
* SegmentedSegmentedEditQuoteGrid
*
*/
import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
import InlineEdit from 'react-edit-inline';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import { browserHistory } from 'react-router';

class SegmentedEditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderData = this.renderData.bind(this);

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
        resizable: true,
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
  renderData() {
    const data = Object.assign([], this.props.data);
    data.map((item, index) => {
      if (item.type === 'Bundle' && item.bundleProducts) {
        data.splice(index + 1, 0, ...item.bundleProducts);
      }
    });
    return data;
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.isProductOption) {
      return (<input type="checkbox" className="check" onChange={this.props.toggleQuoteCheckbox} value={cellInfo.original[cellInfo.column.id].id} />);
    }
  }
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span> {this.props.currency} {cellInfo.value}</span>);
    } else {
      return (<div>
        <Glyphicon glyph="pencil" style={{ float: 'left', opacity: '.4' }} />

        {/* <InlineEdit
          className="group-description"
          activeClassName="group-desc-edit-on"
          text="Click here to edit description "
          paramName="message"
          change={this.dataChanged}
        /> */}
        <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div>
      </div>);
    }
  }
  renderActionItems(cellInfo) {
    const discount = cellInfo.original.canShowDiscountScheduler ? <a><Glyphicon glyph="calendar" onClick={this.handleToggle.bind(this, cellInfo.index)} /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push('/reconfigureproducts'); }}><Glyphicon glyph="wrench" /></a> : '';
    const bundle = cellInfo.original.isBundled ? <a><Glyphicon glyph="info-sign" /></a> : '';
    const clone = cellInfo.original.canClone ? <a onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a title="segment/desegment"><Glyphicon glyph="transfer" /></a> : '';
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
    const data = this.renderData();
    const columns = [
      {
        Header: '',
        style: { textAlign: 'left' },
        sortable: false,
        Cell: this.renderActionItems,
      },
      {
        Header: <input type="checkbox" className="checkAll" onChange={this.props.toggleAllCheckBox} />,
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
        Cell: ({ index }) => <span>{index + 1}</span>,

      }, {
        Header: 'PRODUCT CODE',
        accessor: 'code',
      },

      {
        Header: 'PRODUCT NAME',
        accessor: 'name',
      },
      {
        Header: 'QUANTITY',
        accessor: 'quantity.value',
        id: 'quantity',
        style: { textAlign: 'right' },
        Cell: this.renderEditable,

      },
      {
        Header: 'LIST UNIT PRICE',
        id: 'netUnitPrice',
        style: { textAlign: 'right' },
        Cell: (props) => props.isEditable ? this.renderEditable : <span> {this.props.currency } {props.value}</span>,
      },
      {
        Header: 'ADDITIONAL DISC.',
        accessor: 'additionalDiscount.value',
        id: 'additionalDiscount',
        style: { textAlign: 'right' },
        Cell: (props) => props.isEditable ? this.renderEditable : <span> {this.props.currency } {props.value}</span>,
      },
      {
        Header: 'MARKUP',
        accessor: 'markup',
        style: { textAlign: 'right' },
        Cell: (props) => props.isEditable ? this.renderEditable : <span> {this.props.currency } {props.value}</span>,
      },
      {
        Header: 'NET UNIT PRICE',
        accessor: 'netUnitPrice',
        style: { textAlign: 'right' },
        Cell: (props) => props.isEditable ? this.renderEditable : <span> {this.props.currency } {props.value}</span>,
      },
      {
        Header: 'NET TOTAL',
        accessor: 'totalPrice',
        style: { textAlign: 'right' },
      }];
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
