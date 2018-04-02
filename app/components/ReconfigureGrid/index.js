/**
*
* ReconfigureGrid
*
*/
import React from 'react';
import { RIENumber } from 'riek';
import { Button, Glyphicon, FormControl } from 'react-bootstrap/lib';
import Sidebar from 'components/Sidebar';
import ReactTable from '../ReactTable';
import messages from './messages';
import ProductDetails from '../ProductDetails';

class ReconfigureGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
      },
      isVisible: false,
      isProductDetailsModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
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
  dataChanged(decimal, cellInfo, data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const value = data[key];
    const productObj = {
      id: field[0],
      field: field[1],
      value: parseFloat(value).toFixed(decimal) / 1,
      categoryId: this.props.categoryId,
      featureId: this.props.feature.id,
      applyImmediately: cellInfo.applyImmediately,
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

  deleteProduct(product) {
    const productObj = {
      id: product.id,
      featureId: this.props.feature.id,
      categoryId: this.props.categoryId,
    };
    this.props.deleteProduct(productObj);
  }

  toggleCheckboxChange(product) {
    const productObj = {
      id: product.id,
      featureId: this.props.feature.id,
      categoryId: this.props.categoryId,
      applyImmediately: product.applyImmediately,
      isSelected: product.isSelected,
    };
    this.props.toggleCheckboxChange(productObj);
  }

  renderEditable(cellInfo) {
    if ((this.props.feature.dynamicAddEnabled || cellInfo.original.isSelected) && cellInfo.original[cellInfo.column.id].isEditable === true) {
      return (
        <div>
          <RIENumber
            className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            classEditing="table-edit-input"
            value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
            propName={`${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
            change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2, cellInfo.original)}
            validate={this.validate}
            format={this.formatt.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
            id={cellInfo.original.id}
            classInvalid="invalid"
          />
          <div className="reconfigure-edit-icon" style={{ cursor: 'pointer', float: 'left' }} onClick={this.clickEdit} ><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        </div>);
    }
    return (<span className="cellColor" >{cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>);
  }

  renderActionItems(cellInfo) {
    let input;
    let title;
    if (cellInfo.original.constraintMessage) {
      title = cellInfo.original.constraintMessage;
    }
    if (this.props.feature.dynamicAddEnabled) {
      if (cellInfo.original.isRequired) {
        input = (<a title={this.context.intl.formatMessage({ ...messages.deleteLine })} className="disabled-link"><Glyphicon glyph="trash" /></a>);
      } else {
        input = (<a title={this.context.intl.formatMessage({ ...messages.deleteLine })} onClick={this.deleteProduct.bind(this, cellInfo.original)} ><Glyphicon glyph="trash" style={{ color: '#C9302C' }} /></a>);
      }
      return input;
    } else if (!this.props.feature.dynamicAddEnabled) {
      if (cellInfo.original.isRequired || cellInfo.original.isDisable) {
        input = (<input type="checkbox" className="check" title={title} checked={cellInfo.original.isSelected} disabled value={cellInfo.original.id} />);
      } else {
        input = (<input type="checkbox" className="check" title={title} checked={cellInfo.original.isSelected} onChange={this.toggleCheckboxChange.bind(this, cellInfo.original)} value={cellInfo.original.id} />);
      }
    }
    return input;
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
        Cell: (cellInfo) => (this.props.feature.dynamicAddEnabled || cellInfo.original.isSelected ? <span>{cellInfo.original.code}</span> : <span className="cellColor">{cellInfo.original.code}</span>),
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        //Cell: (cellInfo) => (this.props.feature.dynamicAddEnabled || cellInfo.original.isSelected ? <span>{cellInfo.original.name}</span> : <span className="cellColor">{cellInfo.original.name}</span>),
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
          if (this.props.feature.dynamicAddEnabled || cellInfo.original.isSelected) {
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
        <div className="table-wrap" id="configureGridId">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length > 0 ? this.props.products.length : 1}
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
          <div className="filter">
            <Sidebar container={this} title="Product Filter" side="left" isVisible={this.props.showFilter} onHide={this.props.toggleFilter}>
              <h4>FG</h4>
              <FormControl type="text" placeholder="" style={{ width: '80%' }} />
              <br /> <br /> <br />
              <Button bsStyle="primary">Apply</Button>
              <a className="clear">Clear Fields</a>
            </Sidebar>
          </div>
        </div>
      </div>
    );
  }
}

ReconfigureGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

ReconfigureGrid.propTypes = {
  products: React.PropTypes.any,
  showFilter: React.PropTypes.func,
  toggleCheckboxChange: React.PropTypes.func,
  toggleFilter: React.PropTypes.func,
  feature: React.PropTypes.any,
  categoryId: React.PropTypes.any,
  deleteProduct: React.PropTypes.func,
  updateField: React.PropTypes.func,
};

export default ReconfigureGrid;
