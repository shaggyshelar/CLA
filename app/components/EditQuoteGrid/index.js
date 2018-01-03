import ReactTable from '../ReactTable';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';

import { RIENumber, RIESelect } from 'riek';
import _ from 'lodash';
import DiscountScheduleEditor from '../DiscountScheduleEditor';
import TermDiscountScheduleEditor from '../TermDiscountScheduleEditor';
import messages from './messages';

class EditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderCommonDiscount = this.renderCommonDiscount.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
    this.renderPartnerDiscount = this.renderPartnerDiscount.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTermToggle = this.handleTermToggle.bind(this);
    this.renderData = this.renderData.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
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
        termDiscount: {},
      },
      data: this.props.data,
      isModalOpen: false,
      isModalOpen1: false,
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
    this.clickEdit = this.clickEdit.bind(this);
    this.onReconfigureLineClick = this.onReconfigureLineClick.bind(this);
    this.onSuggestionLinkClick = this.onSuggestionLinkClick.bind(this);
  }
  onReconfigureLineClick(item) {
    const reconfigureObj = {
      id: item.id,
      reconfigured: true,
    };
    this.props.toggleReconfigureLineStatus(reconfigureObj);
    if (this.props.location.query.groupId !== null && this.props.location.query.groupId !== undefined && this.props.location.query.mainTab !== undefined && this.props.location.query.tab !== undefined) {
      browserHistory.push(`/reconfigureproducts?groupId=${this.props.location.query.groupId}&mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else if ((this.props.location.query.groupId === null || this.props.location.query.groupId === undefined) && this.props.location.query.mainTab !== undefined) {
      browserHistory.push(`/reconfigureproducts?mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else {
      browserHistory.push('/reconfigureproducts');
    }
  }

  onSuggestionLinkClick(item) {
    const suggestionObj = {
      id: item.id,
      suggested: true,
    };
    this.props.toggleSuggestionStatus(suggestionObj);
    if (this.props.location.query.groupId !== null && this.props.location.query.groupId !== undefined && this.props.location.query.mainTab !== undefined && this.props.location.query.tab !== undefined) {
      browserHistory.push(`/suggestionpage?groupId=${this.props.location.query.groupId}&mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else if ((this.props.location.query.groupId === null || this.props.location.query.groupId === undefined) && this.props.location.query.mainTab !== undefined) {
      browserHistory.push(`/suggestionpage?mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else {
      browserHistory.push('/suggestionpage');
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
  dataChanged(decimal, data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.update(field[1], parseFloat(data1).toFixed(decimal) / 1, field[2]);
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
  formatt(e, d) {
    return (d.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e }));
  }
  clickEdit(e) {
    e.currentTarget.nextSibling.focus();
  }
  renderActionItems(cellInfo) {
    const reconfigure = cellInfo.original.canReconfigure ? <a title={this.context.intl.formatMessage({ ...messages.reconfigure })} className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { this.onReconfigureLineClick(cellInfo.original); }}><Glyphicon glyph="wrench" /></a> : '';
    const notification = cellInfo.original.notificationMessages.length > 0 ? <a title={cellInfo.original.notificationMessages.map((item) => `${item}\n`)} className={cellInfo.original.notificationMessages.length > 0 ? 'link' : 'disabled-link'}><Glyphicon glyph="bell" /></a> : '';
    const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment.bind(this, cellInfo.original.id, true, cellInfo.original.isBundled, cellInfo.original.parent)} title={this.context.intl.formatMessage({ ...messages.segment })}><Glyphicon glyph="transfer" /></a> : <span className="blank"></span>;
    const suggestion = cellInfo.original.canSuggest ? <a title={this.context.intl.formatMessage({ ...messages.suggestions })} onClick={() => { this.onSuggestionLinkClick(cellInfo.original); }}><Glyphicon glyph="link" /></a> : <span className="blank"></span>;
    return (
      <div className="actionItems" >
        {reconfigure}
        {suggestion}
        {notification}
        {segment}
        {/* <a><Glyphicon glyph="star-empty" /></a> */}
      </div>
    );
  }

  renderPartnerDiscount(cellInfo) {
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
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span> {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })} {selectedOption.text}</span>);
    }
    return (
      <div>
        <div className="edit-icon" style={{ cursor: 'pointer' }} onClick={this.clickEdit}><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        <RIENumber
          className={'table-edit-quantity'}
          classEditing="table-edit-input"
          value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
          format={this.formatt.bind(this, cellInfo.original.decimalsSupported)}
          change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
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
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span> {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })} {selectedOption.text}</span>);
    }
    return (
      <div>
        <div className="edit-icon" style={{ cursor: 'pointer' }} onClick={this.clickEdit}><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        <RIENumber
          className={'table-edit-quantity'}
          classEditing="table-edit-input"
          value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
          format={this.formatt.bind(this, cellInfo.original.decimalsSupported)}
          change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
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

  renderCommonDiscount(cellInfo) {
    if (cellInfo.original.canShowDiscountScheduler && (cellInfo.original.termDiscountSchedule !== null)) {
      return (
        <div>
          <a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a>
          <a className="pro-icon" onClick={this.handleTermToggle.bind(this, cellInfo.index)} title={'Term Discount'}><Glyphicon glyph="tags" /></a>
          <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
        </div>
      );
    } else if (cellInfo.original.canShowDiscountScheduler) {
      return (
        <div>
          <a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a>
          <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
        </div>
      );
    } else if (cellInfo.original.termDiscountSchedule !== null) {
      return (
        <div>
          <a className="pro-icon" onClick={this.handleTermToggle.bind(this, cellInfo.index)} title={'Term Discount'}><Glyphicon glyph="tags" /></a>
          <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>
        </div>
      );
    }
  }
// (cellInfo) => (cellInfo.original.canShowDiscountScheduler  ? <div><a className="pro-icon" onClick={this.handleToggle.bind(this, cellInfo.index)} title={this.context.intl.formatMessage({ ...messages.discountSchedule })}><Glyphicon glyph="calendar" /></a> <a className="pro-icon" onClick={this.handleTermToggle.bind(this, cellInfo.index)} title={"Term Discount"}><Glyphicon glyph="tags" /></a><span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span></div> : <span className="pro-name" title={cellInfo.original.code}>{cellInfo.original.code}</span>),
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (
        <span>
          {cellInfo.column.id === 'quantity' || (cellInfo.original.isBundled && (cellInfo.column.id === 'listPrice')) ? '' : this.props.currency}
          {cellInfo.original.isBundled && (cellInfo.column.id === 'listPrice') ?
            <span>Included</span>
          : cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })}
        </span>
      );
    }
    return (
      cellInfo.original.isBundled && (cellInfo.column.id === 'listPrice') ?
        <span>Included</span>
      :
        <div>
          <div className="edit-icon" style={{ cursor: 'pointer' }} onClick={this.clickEdit}><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
          <RIENumber
            className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            classEditing="table-edit-input"
            value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
            propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
            format={this.formatt.bind(this, cellInfo.original.decimalsSupported)}
            change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
            validate={this.validate}
            classInvalid="invalid"
          />
        </div>
    );
  }
  renderChecbox(cellInfo) {
    if (!cellInfo.original.parentLineId) {
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
  renderOverlay(e) {
    const tooltip = (
      <Tooltip id={`${e.original.id}-${e.original.name}`} bsClass="tooltip" className="hover-tip">
        <div className="lab"><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${e.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name" title={e.original.name}>{e.original.name}</span></div>
      </Tooltip>
      );
    return (<OverlayTrigger placement="bottom" overlay={tooltip}>
      <span >{e.original.name}</span>
    </OverlayTrigger>);
  }
  render() {
    const data = this.props.data;
    // TODO: To replace with actual data from server
    _.forEach(data, (value) => {
      if (!value.partnerDiscount) {
        value.partnerDiscount = { dataType: 'inputSelect', isEditable: true, isVisible: true, value: 5, selectValues: [{ id: '11111', value: '%', isSelected: true }] };
      }
    });
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
        Cell: this.renderCommonDiscount,
      },

      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: this.renderOverlay.bind(this),
        // (cellInfo) => (cellInfo.original.isRequired ? <div><a className="pro-icon" title={`${this.context.intl.formatMessage({ ...messages.required })} ${cellInfo.original.parentName}`}><Glyphicon glyph="info-sign" /></a> <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span></div> : <span className="pro-name" title={cellInfo.original.name}>{cellInfo.original.name}</span>),
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
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.partnerDiscount })}>{this.context.intl.formatMessage({ ...messages.partnerDiscount })}</span>,
        accessor: 'partnerDiscount.value',
        id: 'partnerDiscount',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderPartnerDiscount,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.additionalDiscount })}>{this.context.intl.formatMessage({ ...messages.additionalDiscount })}</span>,
        accessor: 'additionalDiscount.value',
        id: 'additionalDiscount',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: this.renderDiscount,
      },
      // {
      //   Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.markup })}>{this.context.intl.formatMessage({ ...messages.markup })}</span>,
      //   accessor: 'markup',
      //   style: { textAlign: 'right' },
      //   Cell: (props) => <span>{props.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} %</span>,
      // },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netPrice })}>{this.context.intl.formatMessage({ ...messages.netPrice })}</span>,
        accessor: 'netUnitPrice',
        style: { textAlign: 'right' },
        Footer: (<span>Standard Total</span>),
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: props.original.decimalsSupported ? props.original.decimalsSupported : 2 })}</span>,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.netTotal })}>{this.context.intl.formatMessage({ ...messages.netTotal })}</span>,
        accessor: 'netTotal',
        style: { textAlign: 'right' },
        Footer: (<span>{this.props.currency} {total.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>),
        headerStyle: { textAlign: 'right' },
        Cell: (props) => <span> {this.props.currency } {props.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: props.original.decimalsSupported ? props.original.decimalsSupported : 2 })}</span>,
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
  location: PropTypes.any,
  toggleReconfigureLineStatus: PropTypes.func,
  toggleSuggestionStatus: PropTypes.func,
};


export default EditQuoteGrid;
