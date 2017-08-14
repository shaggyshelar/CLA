import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
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
      if (cellInfo.column.id === 'quantity') {
        return (<span> {cellInfo.value}</span>)
      } else {
        return (<span>{cellInfo.value.toFixed(2)}</span>) 
      }
    } else {
      return (<div>
       
        <InlineEdit
          className="table-edit"
          activeClassName="table-edit-input"
          text={cellInfo.value}
          paramName="message"
          change={this.dataChanged}
        />
        <Glyphicon className='inline-edit' glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
        {/* <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div> */}
      </div>);
    }
  }
  renderActionItems(cellInfo) {
    const discount = cellInfo.original.canShowDiscountScheduler ? <a title="View Discount Schedule" onClick={this.handleToggle.bind(this, cellInfo.index)} ><Glyphicon glyph="calendar" /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a title="Reconfigure Lines" className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push('/reconfigureproducts'); }}><Glyphicon glyph="wrench" /></a> : '';
    const bundle = cellInfo.original.isBundled ? <a title={'Required by ' + cellInfo.original.name}><Glyphicon glyph="info-sign" /></a> : '';
    const clone = cellInfo.original.canClone ? <a  title="Clone Line" onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment} title="Segment / Desegment"><Glyphicon glyph="transfer" /></a> : '';
    return (
      <div className="actionItems" >
        {/* <a><Glyphicon glyph="star-empty" /></a> */}
        {bundle}
        {discount}
        {reconfigure}
        {cellInfo.original.isProductOption ? <span></span> : clone}
        {cellInfo.original.isProductOption ? <span></span> : <a  title="Delete Line" onClick={this.deleteLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="trash" /></a>}
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
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: ({ index }) => <span>{index + 1}</span>,

      }, {
        Header:  () => <span title="PRODUCT CODE">PRODUCT CODE</span>,
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
        id: 'netUnitPrice',
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
        Cell: this.renderEditable,
      },
      {
        Header: () => <span title="NET UNIT PRICE">NET UNIT PRICE</span>,
        accessor: 'netUnitPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,
      },
      {
        Header: () => <span title="NET TOTAL">NET TOTAL</span>,
        accessor: 'totalPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toFixed(2)}</span>,
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
};


export default EditQuoteGrid;
