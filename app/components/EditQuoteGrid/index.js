import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Glyphicon } from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';
import 'react-table/react-table.css';
import { RIENumber, RIESelect } from 'riek';
import _ from 'lodash';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import messages from './messages';

class EditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
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
    this.selectDataChanged = this.selectDataChanged.bind(this);
    this.selectBundleDataChanged = this.selectBundleDataChanged.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
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
    this.props.updateBundle(field[0], field[1], field[2], parseFloat(data1));
  }
  selectDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSelect(field[1], data1.id, field[2]);
  }

  selectBundleDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSelectBundle(field[0], field[1], field[2], data1.id);
  }
  validate(string) {
    const number = parseFloat(string);
    if (isNaN(number) || !isFinite(number)) return false;
    return !isNaN(number);
  }
  calculateTotal() {
    let total = 0;
    _.forEach(this.props.data, (value) => {
      total += value.netTotal;
      // if (value.type === 'Bundle' && value.bundleProducts) {
      //   value.bundleProducts.map((i) => {
      //     if (!i.isSegmented) {
      //       total += value.netTotal;
      //     }
      //     return this;
      //   });
      // }
    });
    return total;
  }
  formatt(e) {
    return (e.toLocaleString('en', { minimumFractionDigits: 2 }));
  }
  renderActionItems(cellInfo) {
    // const discount = cellInfo.original.canShowDiscountScheduler ? <a title="View Discount Schedule" onClick={this.handleToggle.bind(this, cellInfo.index)} ><Glyphicon glyph="calendar" /></a> : <span className="blank"></span>;
    // const reconfigure = cellInfo.original.canReconfigure ? <a title={this.context.intl.formatMessage({ ...messages.recongifure })} className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push(`/reconfigureproducts?id=${cellInfo.original.id}`); }}><Glyphicon glyph="wrench" /></a> : <span className="blank"></span>;
    const reconfigure = cellInfo.original.canReconfigure ? <a title={this.context.intl.formatMessage({ ...messages.recongifure })} className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push(`/reconfigureproducts?id=${cellInfo.original.id}&quoteId=${this.props.quoteData.id}&priceBookId=${this.props.quoteData.priceBookId}&quoteName=${this.props.quoteData.name}`); }}><Glyphicon glyph="wrench" /></a> : <span className="blank"></span>;
    // const bundle = cellInfo.original.isBundled ? <a title={`Required by ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> : <span className="blank"></span>;
    // const clone = cellInfo.original.canClone ? <a title="Clone Line" onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" style={{ color: '#449D44' }} /></a> : <span className="blank"></span>;
    const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment.bind(this, cellInfo.original.id, true, cellInfo.original.isBundled, cellInfo.original.parent)} title={this.context.intl.formatMessage({ ...messages.segment })}><Glyphicon glyph="transfer" /></a> : <span className="blank"></span>;
    return (
      <div className="actionItems" >
        {reconfigure}
        {segment}
        {/* <a><Glyphicon glyph="star-empty" /></a> */}
      </div>
    );
  }
  renderDiscount(cellInfo) {
    const selected = cellInfo.original[cellInfo.column.id].selectValues;
    const options = [];
    const selectedOption = {};
    selected.map((i) => {
      options.push({ id: i.id, text: i.value });
      if (i.isSelected) {
        selectedOption.id = i.id;
        selectedOption.text = i.value;
      }
      return this;
    });
    return (
      <div>
        <div className="edit-icon"><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        <RIENumber
          className={'table-edit-quantity'}
          classEditing="table-edit-input"
          value={cellInfo.value}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
          format={this.formatt}
          change={this.dataChanged}
          validate={this.validate}
          classInvalid="invalid"
        />
        <RIESelect
          className={'inline-select'}
          classEditing="inline-select-edit"
          value={selectedOption}
          options={options}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
          change={this.selectDataChanged}
          classInvalid="invalid"
          editProps={{ width: '40px' }}
        />

      </div>);
  }
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span>{cellInfo.column.id === 'quantity' ? '' : this.props.currency} {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>);
    }
    return (
      <div>
        <div className="edit-icon"><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        <RIENumber
          className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
          classEditing="table-edit-input"
          value={cellInfo.value}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
          format={this.formatt}
          change={this.dataChanged}
          validate={this.validate}
          classInvalid="invalid"
        />
      </div>);
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.isBundled) {
      return (<input type="checkbox" className="check" onChange={this.props.toggleQuoteCheckbox} value={cellInfo.original.id} />);
    }
    return (<span></span>);
  }
  renderData() {
    const data = Object.assign([], this.props.data);
    data.map((item, index) => {
      if (item.type === 'Bundle' && item.bundleProducts) {
        item.bundleProducts.map((i, index1) => {
          if (!i.isSegmented) {
            data.splice(index + 1 + index1, 0, i);
          }
          return this;
        });
      }
      return this;
    });
    return data;
  }
  render() {
    const data = this.props.data;
    const total = this.calculateTotal();
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
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: (cellInfo) => (cellInfo.original.canShowDiscountScheduler ? <div><a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a> <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span></div> : <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>),
      },

      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: (cellInfo) => (cellInfo.original.isBundled ? <div><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span></div> : <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span>),
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.quantity })}>{this.context.intl.formatMessage({ ...messages.quantity })}</span>,
        accessor: 'quantity.value',
        id: 'quantity',
        className: 'table-edit-row',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,

      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.listPrice })}>{this.context.intl.formatMessage({ ...messages.listPrice })}</span>,
        accessor: 'listPrice.value',
        id: 'listPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderEditable,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.additionalDiscount })}>{this.context.intl.formatMessage({ ...messages.additionalDiscount })}</span>,
        accessor: 'additionalDiscount.value',
        id: 'additionalDiscount',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderDiscount,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.markup })}>{this.context.intl.formatMessage({ ...messages.markup })}</span>,
        accessor: 'markup',
        style: { textAlign: 'right' },
        Cell: (props) => <span>{props.value.toLocaleString('en', { minimumFractionDigits: 2 })} %</span>,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netPrice })}>{this.context.intl.formatMessage({ ...messages.netPrice })}</span>,
        accessor: 'netUnitPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netTotal })}>{this.context.intl.formatMessage({ ...messages.netTotal })}</span>,
        accessor: 'totalPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
      },
    ];
    return (
      <div>
        <div className="table-wrap edit-grid-quote">
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
        <div className="sub-footer upper-case">
          {this.context.intl.formatMessage({ ...messages.subTotal })} : {this.props.currency} {total.toLocaleString('en', { minimumFractionDigits: 2 })}
        </div>

      </div>
    );
  }
}
EditQuoteGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
EditQuoteGrid.propTypes = {
  data: PropTypes.any,
  currency: PropTypes.any,
  deleteLine: PropTypes.func,
  cloneLine: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
  update: PropTypes.func,
  updateBundle: PropTypes.func,
  segment: PropTypes.func,
  updateSelect: PropTypes.func,
  updateSelectBundle: PropTypes.func,
  quoteData: PropTypes.any,
};


export default EditQuoteGrid;
