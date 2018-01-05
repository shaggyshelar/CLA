import ReactTable from '../ReactTable';
import React from 'react';
import { Glyphicon } from 'react-bootstrap/lib';
import ProductDetails from '../ProductDetails';

import messages from './messages';
class ProductSelectionGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        detailedInfo: {},
      },
      isVisible: false,
      isProductDetailsModalOpen: false,
    };
    this.handleProductDetailsToggle = this.handleProductDetailsToggle.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.setTableOption = this.setTableOption.bind(this);
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

  handleProductDetailsToggle(index) {
    const selectedData = this.props.products[index];
    if (selectedData !== undefined) {
      this.setState({
        isProductDetailsModalOpen: !this.state.isProductDetailsModalOpen,
        detailedInfo: selectedData.detailedInfo,
      });
    } else {
      this.setState({
        isProductDetailsModalOpen: !this.state.isProductDetailsModalOpen,
      });
    }
  }

  renderActionItems(cellInfo) {
    const notification = cellInfo.original.notificationMessages.length > 0 ? <a title={cellInfo.original.notificationMessages.map((item) => `${item }\n`)} className={cellInfo.original.notificationMessages.length > 0 ? 'link' : 'disabled-link'}><Glyphicon glyph="bell" /></a> : '';
    return (
      <div className="actionItems" >
        {notification}
      </div>
    );
  }


  renderOverlay(cellInfo) {
    return (
      <div className="lab"><a onClick={this.handleProductDetailsToggle.bind(this, cellInfo.index)} className="proname-icon" title={`${cellInfo.original.name}`}>{cellInfo.original.name}</a> </div>
    );
  }
  render() {
    const columns = [
      {
        Header: '',
        style: { textAlign: 'left' },
        sortable: false,
        width: 60,

        Cell: this.renderActionItems,
      },
      {
        Header: <input type="checkbox" className="checkAll" onChange={this.props.toggleCheckAll} />,
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        headerStyle: { textAlign: 'center' },
        Cell: (props) => <input type="checkbox" className="check" onChange={this.props.toggleCheckboxChange} value={props.value} />,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productCode })}>{this.context.intl.formatMessage({ ...messages.productCode })}</span>,
        accessor: 'code',
        width: 200,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
      },

      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
        accessor: 'name',
        width: 250,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
        Cell: this.renderOverlay,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productFamily })}>{this.context.intl.formatMessage({ ...messages.productFamily })}</span>,
        accessor: 'type',
        width: 200,
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' },
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productDescription })}>{this.context.intl.formatMessage({ ...messages.productDescription })}</span>,
        style: { textAlign: 'left' },
        accessor: 'description',
        width: 400,
        headerStyle: { textAlign: 'left', title: 'PRODUCT DESCRIPTION' },
        Cell: (cellInfo) => <span title={cellInfo.original.description}>{cellInfo.original.description}</span>,
      },
      {
        Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.listPrice })}>{this.context.intl.formatMessage({ ...messages.listPrice })}</span>,
        accessor: 'listPrice.value',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Cell: (cellInfo) => <span>{cellInfo.original.currency} {cellInfo.original.listPrice.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>,
      },
    ];
    return (
      <div>
        <div className="table-wrap productTopPadding">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length}
            style={{ width: '100%' }}
            {...this.state.tableOptions}

          />
        </div>
        <ProductDetails
          show={this.state.isProductDetailsModalOpen} onHide={this.handleProductDetailsToggle}
          style={{
            display: 'inline-flex',
          }}
          value={this.state.value}
          detailedInfo={this.state.detailedInfo}
        />
      </div>
    );
  }
}
ProductSelectionGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
ProductSelectionGrid.propTypes = {
  products: React.PropTypes.any,
  toggleCheckAll: React.PropTypes.any,
  toggleCheckboxChange: React.PropTypes.any,
};

export default ProductSelectionGrid;
