import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
import InlineEdit from 'react-edit-inline';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import { browserHistory } from 'react-router';

class EditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderData = this.renderData.bind(this);
    this.validate = this.validate.bind(this);
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
    this.dataChanged = this.dataChanged.bind(this);
    this.bundleDataChanged = this.bundleDataChanged.bind(this);
    this.checkAll = this.checkAll.bind(this);
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
        item.bundleProducts.map((i,index1) => {
          data[index].bundleProducts[index1].parent = item.id;
          return this;
        });
        data.splice(index + 1, 0, ...item.bundleProducts);
      }
      return this;
    });
    return data;
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.isProductOption) {
      return (<input type="checkbox" className="check" onChange={this.props.toggleQuoteCheckbox} value={cellInfo.original.id} />);
    }
    return (<span></span>);
  }
  dataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.update(field[1], parseFloat(data1), field[2]);
  }
  bundleDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateBundle(field[0], field[1], field[2], parseFloat(data1) );
  }
  validate(text) {
    const decimal = /^([0-9]+(\.[0-9]+)?|Infinity)$/;
    return (decimal.test(text) && (parseFloat(text) > 0));
  }
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span>{cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>);
    } else {
      return (
        <div>
          <InlineEdit
            className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            activeClassName="table-edit-input"
            text={cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}
            paramName={`${cellInfo.original.isProductOption ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
            staticElement="div"
            change={cellInfo.original.isProductOption ? this.bundleDataChanged.bind(this) : this.dataChanged}
            validate={this.validate}
            title="asdasd"
            id={cellInfo.original.isProductOption ? cellInfo.original.parent : cellInfo.original.id}
          />
          <div className="edit-icon"><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        </div>);
    }
  }
  renderActionItems(cellInfo) {
    const discount = cellInfo.original.canShowDiscountScheduler ? <a title="View Discount Schedule" onClick={this.handleToggle.bind(this, cellInfo.index)} ><Glyphicon glyph="calendar" /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a title="Reconfigure Lines" className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push('/reconfigureproducts'); }}><Glyphicon glyph="wrench" /></a> : '';
    const bundle = cellInfo.original.isBundled ? <a title={`Required by ${cellInfo.original.name}`}><Glyphicon glyph="info-sign" /></a> : '';
    const clone = cellInfo.original.canClone ? <a title="Clone Line" onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment} title="Segment / Desegment"><Glyphicon glyph="transfer" /></a> : '';
    return (
      <div className="actionItems" >
        {/* <a><Glyphicon glyph="star-empty" /></a> */}
        {bundle}
        {discount}
        {reconfigure}
        {cellInfo.original.isProductOption ? <span></span> : clone}
        {cellInfo.original.isProductOption ? <span></span> : <a title="Delete Line" onClick={this.deleteLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="trash" /></a>}
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
      },
      {
        Header: () => <span title="QUANTITY">QUANTITY</span>,
        accessor: 'quantity.value',
        id: 'quantity',
        className: 'table-edit-row',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,

      },
      {
        Header: () => <span title="LIST UNIT PRICE">LIST UNIT PRICE</span>,
        accessor: 'listPrice.value',
        id: 'listPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,
      },
      {
        Header: () => <span title="ADDITIONAL DISC.">ADDITIONAL DISC.</span>,
        accessor: 'additionalDiscount.value',
        id: 'additionalDiscount',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,
      },
      {
        Header: () => <span title="MARKUP">MARKUP</span>,
        accessor: 'markup',
        style: { textAlign: 'right' },
        Cell: (props) => <span>{props.value.toLocaleString('en', { minimumFractionDigits: 2 })} %</span>,
      },
      {
        Header: () => <span title="NET UNIT PRICE">NET UNIT PRICE</span>,
        accessor: 'netUnitPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
      },
      {
        Header: () => <span title="NET TOTAL">NET TOTAL</span>,
        accessor: 'totalPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
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

EditQuoteGrid.propTypes = {
  data: PropTypes.any,
  currency: PropTypes.any,
  deleteLine: PropTypes.func,
  cloneLine: PropTypes.func,
  toggleAllCheckBox: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
  update: PropTypes.func,
};


export default EditQuoteGrid;
