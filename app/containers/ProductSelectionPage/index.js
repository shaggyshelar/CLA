/*
 *
 * ProductSelectionPage
 *
 */
import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
import { makeSelectProductSelectionPage, makeSearchedProductsData, makeSelectLoading, showFilter, getQuoteLines, makeProductsData } from './selectors';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
import { loadProductsData, showFilteredData, loadSearchData, onSearchItemSelected } from './actions';
import { addProducts } from '../App/actions';
export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      dataProd: [
        {
          _id: '596db79f58d3f94623033cd0',
          'PRODUCT CODE': 'Tillman',
          'PRODUCT NAME': 'Bradley',
          'LIST PRICE': '$ 332.9494',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 625.0061',
          'NET TOTAL': '$ 25.9874',
          QUANTITY: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          'PRODUCT CODE': 'Hernandez',
          'PRODUCT NAME': 'Holman',
          'LIST PRICE': '$ 700.7878',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 506.595',
          'NET TOTAL': '$ 502.2979',
          QUANTITY: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          'PRODUCT CODE': 'Burch',
          'PRODUCT NAME': 'Collins',
          'LIST PRICE': '$ 964.9937',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 269.6924',
          'NET TOTAL': '$ 305.6421',
          QUANTITY: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          'PRODUCT CODE': 'Coleman',
          'PRODUCT NAME': 'Hunter',
          'LIST PRICE': '$ 833.9739',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 942.7997',
          'NET TOTAL': '$ 72.1729',
          QUANTITY: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          'PRODUCT CODE': 'Lorene',
          'PRODUCT NAME': 'Brennan',
          'LIST PRICE': '$ 804.2955',
          'PRODUCT FAMILY': '',
          'PRODUCT DESCRIPTION': '',
          'NET UNIT PRICE': '$ 121.7662',
          'NET TOTAL': '$ 487.7556',
          QUANTITY: 77.3144,
        },
      ],
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.addProductsWait = this.addProductsWait.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.onSearchItemSelected = this.onSearchItemSelected.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    this.props.getProductsData();
  }

  onSearch(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    this.props.onSearch(value);
  }

  onSearchItemSelected(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    this.props.onSearchItemSelected(value);
  }

  searchInputChange(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    this.props.searchInputChange(value);
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
  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
  }
  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    const data = this.state.selectedProducts;
    if (!e.target.checked) {
      _.remove(data, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      data.push(e.target.value);
    }
    this.setState({
      selectedProducts: data,
    });
  }
  addProductsWait() {
    let data = [];
    data = _.filter(this.props.products, (o) =>
      this.state.selectedProducts.includes(o.id)
    );
    if (this.props.location.query.groupId) {
      data.forEach((i, index) => {
        data[index].groupId = parseInt(this.props.location.query.groupId, 0);
        data[index].id = parseInt(Math.random() * 100000, 0).toString();
      });
      this.props.addProductsToQuote(data);
    } else {
      this.props.addProductsToQuote(data);
    }
  }
  addProducts() {
    let data = [];
    data = _.filter(this.props.products, (o) =>
      this.state.selectedProducts.includes(o.id)
    );
    if (this.props.location.query.groupId) {
      data.forEach((i, index) => {
        data[index].groupId = parseInt(this.props.location.query.groupId, 0);
        data[index].id = parseInt(Math.random() * 100000, 0).toString();
      });
      this.props.addProductsToQuote(data);
      browserHistory.push(`/EditQuote?groupId=${this.props.location.query.groupId}`);
    } else {
      this.props.addProductsToQuote(data);
      browserHistory.push('/EditQuote');
    }
  }

  render() {
    let data = [];
    if (_.isArray(this.props.searchedProducts) && this.props.searchedProducts.length > 0) {
      data = this.props.searchedProducts;
    } else if (_.isArray(this.props.products)) {
      data = this.props.products;
    }

    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    return (
      <div>
        <div className="loader" style={style}></div>
        <Helmet
          title="ProductSelectionPage"
          meta={[{
            name: 'description',
            content: 'Description of ProductSelectionPage',
          }, this.props.data,
          ]}
        />
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <ProductSelectionHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            addProducts={this.addProducts}
            addProductsWait={this.addProductsWait}
            data={data}
            searchInputChange={this.searchInputChange}
            onSearchClick={this.onSearch}
            onSearchItemSelected={this.onSearchItemSelected}
          />
        </div>
        <div>
          <ProductSelectionGrid
            products={this.props.products}
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            toggleCheckboxChange={this.toggleCheckboxChange}
            data={this.state.dataProd}
            addProducts={this.addProducts}
            addProductsWait={this.addProductsWait}
            checkAll={this.state.checkAll}
            toggleCheckAll={this.checkAll}
          />
        </div>
      </div>
    );
  }
}

ProductSelectionPage.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  data: PropTypes.any,
  products: PropTypes.any,
  getProductsData: PropTypes.func,
  location: PropTypes.any,
  addProductsToQuote: PropTypes.func,
  searchInputChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchedProducts: PropTypes.any,
  onSearchItemSelected: PropTypes.func,
  loading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionPage: makeSelectProductSelectionPage(),
  showFilter: showFilter(),
  data: getQuoteLines(),
  products: makeProductsData(),
  searchedProducts: makeSearchedProductsData(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleFilter: (value) => {
      dispatch(showFilteredData(value));
    },
    getProductsData: () => {
      dispatch(loadProductsData());
    },
    addProductsToQuote: (value) => {
      dispatch(addProducts(value));
    },
    searchInputChange: (value) => {
      dispatch(loadSearchData(value, false));
    },
    onSearch: (value) => {
      dispatch(loadSearchData(value, true));
    },
    onSearchItemSelected: (value) => {
      dispatch(onSearchItemSelected(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
