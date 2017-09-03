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
import { toast } from 'react-toastify';
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
    this.props.getProductsData(this.props.location.query.groupId, this.props.location.query.PriceBookId);
  }

  onSearch(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    const searchObj = {
      searchValue: value,
      fromSearch: true,
      groupId: this.props.location.query.groupId,
      priceBookId: this.props.location.query.PriceBookId,
    };
    this.props.onSearch(searchObj);
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
    const searchObj = {
      searchValue: value,
      fromSearch: false,
      groupId: this.props.location.query.groupId,
      priceBookId: this.props.location.query.PriceBookId,
    };
    this.props.searchInputChange(searchObj);
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
        data[index].groupId = this.props.location.query.groupId;
        data[index].id = parseInt(Math.random() * 100000, 0).toString();
      });
      this.props.addProductsToQuote(data);
    } else {
      this.props.addProductsToQuote(data);
    }

    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    if (d.checked) {
      d.click();
      toast.success(' Products Added', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  addProducts() {
    let data = [];
    data = _.filter(this.props.products, (o) =>
      this.state.selectedProducts.includes(o.id)
    );
    if (this.props.location.query.groupId) {
      data.forEach((i, index) => {
        data[index].groupId = this.props.location.query.groupId;
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
    data = this.props.searchedProducts.toJS();
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
            products={this.props.products.toJS()}
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
    getProductsData: (groupId, priceBookId) => {
      dispatch(loadProductsData(groupId, priceBookId));
    },
    addProductsToQuote: (value) => {
      dispatch(addProducts(value));
    },
    searchInputChange: (searchObj) => {
      dispatch(loadSearchData(searchObj));
    },
    onSearch: (searchObj) => {
      dispatch(loadSearchData(searchObj));
    },
    onSearchItemSelected: (value) => {
      dispatch(onSearchItemSelected(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
