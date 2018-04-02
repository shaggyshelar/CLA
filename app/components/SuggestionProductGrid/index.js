/**
*
* SuggestionProductGrid
*
*/

import { RIENumber } from 'riek';
import { Glyphicon } from 'react-bootstrap/lib';
import React from 'react';
import ReactTable from '../ReactTable';
import messages from './messages';
import ProductDetails from '../ProductDetails';

// import styled from 'styled-components';


class SuggestionProductGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
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
        selectedData: {},
      },
      isVisible: false,
      isProductDetailsModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.handleProductDetailsToggle = this.handleProductDetailsToggle.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
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

  clickEdit(e) {
    if (e.currentTarget.previousSibling) {
      e.currentTarget.previousSibling.focus();
    }
  }
  dataChanged(decimal, data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const value = data[key];
    const productObj = {
      tempId: field[0],
      field: field[1],
      value: parseFloat(value).toFixed(decimal) / 1,
    };
    this.props.updateField(productObj);
  }

  validate(string) {
    const number = parseFloat(string);
    if (isNaN(number) || !isFinite(number)) return false;
    return !isNaN(number);
  }
  formatt(e, d) {
    return (d.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e }));
  }

  handleProductDetailsToggle(cellInfo) {
  let selectedData = cellInfo.original;
    if (selectedData !== undefined) {     
      selectedData.productId = selectedData.id;
      this.setState({
        isProductDetailsModalOpen: !this.state.isProductDetailsModalOpen,
        selectedData: selectedData,
      });
    } else {
      this.setState({
        isProductDetailsModalOpen: !this.state.isProductDetailsModalOpen,
      });
    }
  }

  renderOverlay(cellInfo) {
    if (cellInfo.original.detailedInfo.images.length > 0 || cellInfo.original.detailedInfo.description !== null ) {
      return (
        <div className="lab"><a onClick={this.handleProductDetailsToggle.bind(this, cellInfo)} className="proname-icon" title={`${cellInfo.original.name}`}>{cellInfo.original.name}</a> </div>
      );
    }
    return (
      <div className="lab"><span  title={`${cellInfo.original.name}`}>{cellInfo.original.name}</span> </div>
    );
  }

  toggleCheckboxChange(product) {
    const productObj = {
      tempId: product.tempId,
    };
    this.props.toggleCheckboxChange(productObj);
  }
  renderEditable(cellInfo) {
    if (cellInfo.original.isSelected && cellInfo.original[cellInfo.column.id].isEditable === true) {
      return (
        <div>
          <RIENumber
            className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            classEditing="table-edit-input"
            value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
            propName={`${cellInfo.original.tempId}*(&)*${cellInfo.column.id}`}
            change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
            validate={this.validate}
            format={this.formatt.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
            id={cellInfo.original.tempId}
            classInvalid="invalid"
          />
          <div className="reconfigure-edit-icon" style={{ cursor: 'pointer', float: 'left' }} onClick={this.clickEdit} ><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        </div>);
    }
    return (<span className="cellColor" >{cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>);
  }

  renderActionItems(cellInfo) {
    return (<input type="checkbox" className="check" checked={cellInfo.original.isSelected} onChange={this.toggleCheckboxChange.bind(this, cellInfo.original)} value={cellInfo.original.id} />);
  }
  render() {
    const columns = [
      {
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        Cell: this.renderActionItems,
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
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productCode })}>{this.context.intl.formatMessage({ ...messages.productCode })}</span>,
        accessor: 'code',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: (cellInfo) => (cellInfo.original.isSelected ? <span>{cellInfo.original.code}</span> : <span className="cellColor">{cellInfo.original.code}</span>),
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        //Cell: (cellInfo) => (cellInfo.original.isSelected ? <span>{cellInfo.original.name}</span> : <span className="cellColor">{cellInfo.original.name}</span>),
        Cell: this.renderOverlay,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productDescription })}>{this.context.intl.formatMessage({ ...messages.productDescription })}</span>,
        accessor: 'description',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: (cellInfo) => <span title={cellInfo.original.description}>{cellInfo.original.description}</span>,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.unitPrice })}>{this.context.intl.formatMessage({ ...messages.unitPrice })}</span>,
        accessor: 'listPrice.value',
        id: 'listPrice',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (cellInfo) => {
          if (cellInfo.original.isSelected) {
            return (
              cellInfo.original.isBundled ? <span> Included </span> :
              <span>
                {cellInfo.original.currency} {cellInfo.original.listPrice.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })}
              </span>);
          } else {
            return (
            cellInfo.original.isBundled ? <span> Included </span> :
            <span className="cellColor">
              {cellInfo.original.currency} {cellInfo.original.listPrice.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })}
            </span>);
          }
        },
      },
    ];

    return (
      <div>
        <div className="table-wrap" id="suggestionGridId">
          <ReactTable
            className="-striped -highlight"
            data={this.props.suggestionsData}
            columns={columns}
            defaultPageSize={this.props.suggestionsData.length}
            pageSize={this.props.suggestionsData.length}
            style={{ width: '100%' }}
            {...this.state.tableOptions}
          />
          <ProductDetails
          show={this.state.isProductDetailsModalOpen} onHide={this.handleProductDetailsToggle}
          style={{
            display: 'inline-flex',
          }}
          isDetailsShown={this.state.isProductDetailsModalOpen}
          value={this.state.value}
          selectedData={this.state.selectedData}
        />
        </div>
      </div>
    );
  }
}

SuggestionProductGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

SuggestionProductGrid.propTypes = {
  suggestionsData: React.PropTypes.any,
  toggleCheckboxChange: React.PropTypes.any,
  updateField: React.PropTypes.any,
};

export default SuggestionProductGrid;
