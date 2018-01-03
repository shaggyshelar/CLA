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
import { SERVER_URL, EntityURLs } from 'containers/App/constants';
import { createStructuredSelector } from 'reselect';
import ProductSelectionGrid from 'components/ProductSelectionGrid';
import { globalLoading, getLanguage, makeSelectProductSelectionPage, makeSelectLoading, showFilter, getQuoteLines, makeProductsData } from './selectors';
import { ProductSelectionHeader } from '../ProductSelectionHeader';
import { loadProductsData, showFilteredData, loadSearchData, onSearchItemSelected } from './actions';
import { addProducts } from '../App/actions';
import { changeLocale } from '../LanguageProvider/actions';
import { tempPriceBookId } from '../App/constants';

export class ProductSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      searchedProducts: [],
      disabledButton: true,
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
    const priceBookId = tempPriceBookId;

    if (process.env.NODE_ENV === 'production') {
      this.props.getProductsData(this.props.location.query.groupId, this.props.location.query.PriceBookId, this.props.location.query.QuoteId);
    }
    if (process.env.NODE_ENV === 'development') {
      this.props.getProductsData(this.props.location.query.groupId, priceBookId, this.props.location.query.QuoteId);
    }
  }

  onSearch(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    this.setState({
      searchedProducts: [],
    });
    let priceBookId = tempPriceBookId;

    if (process.env.NODE_ENV === 'production') {
      priceBookId = this.props.location.query.PriceBookId;
    }
    const searchObj = {
      searchValue: value,
      fromSearch: true,
      groupId: this.props.location.query.groupId,
      priceBookId,
      quoteId: this.props.location.query.QuoteId,
    };
    this.props.onSearch(searchObj);
  }

  onSearchItemSelected(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    this.setState({
      searchedProducts: [],
    });
    this.props.onSearchItemSelected(value);
  }

  searchInputChange(value) {
    if (this.state.selectedProducts.length > 0) {
      this.setState({
        selectedProducts: [],
      });
    }
    let priceBookId = tempPriceBookId;

    if (process.env.NODE_ENV === 'production') {
      priceBookId = this.props.location.query.PriceBookId;
    }
    const searchObj = {
      searchValue: value,
      fromSearch: false,
      groupId: this.props.location.query.groupId,
      priceBookId,
      quoteId: this.props.location.query.QuoteId,
    };
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?PriceListId=${searchObj.priceBookId}&QuoteId=${searchObj.quoteId}&SearchValue=${searchObj.searchValue}`}`;
    fetch(requestURL).then((response) => response.json()).then((json) => {
      this.setState({
        searchedProducts: json.products.map((item) => item.name),
      });
    });
  }
  checkAll(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (e.target.checked) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    for (let i = 0; i < d.length; i += 1) {
      if (!d[i].checked && e.target.checked) {
        d[i].checked = true;
      } else if (d[i].checked && !e.target.checked) {
        d[i].checked = false;
      }
    }
  }
  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
  }
  toggleCheckboxChange() {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (_.filter(d1, { checked: true }).length) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    if (d.checked) {
      d.checked = false;
    }
   // e.target.checked = !e.target.checked;
    // if (!e.target.checked) {
    //   _.remove(data, (n) => n === e.target.value);
    //   if (d.checked) {
    //     d.checked = false;
    //   }
    // } else {
    //   data.push(e.target.value);
    // }
    // this.setState({
    //   selectedProducts: data,
    // });
  }
  addProductsWait() {
    const data = [];
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i += 1) {
      if (d[i].checked && this.props.location.query.groupId) {
        data.push({ productId: d[i].value, groupId: this.props.location.query.groupId });
      } else if (d[i].checked && !this.props.location.query.groupId) {
        data.push({ productId: d[i].value });
      }
    }
    this.props.addProductsToQuote(data);
    for (let i = 0; i < d.length; i += 1) {
      d[i].checked = false;
    }
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    if (d1.checked) {
      d1.checked = false;
    }
    this.setState({ disabledButton: true });
  }
  addProducts() {
    const data =  [];

    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i += 1) {
      if (d[i].checked && this.props.location.query.groupId) {
        data.push({ productId: d[i].value, groupId: this.props.location.query.groupId });
      } else if (d[i].checked && !this.props.location.query.groupId) {
        data.push({ productId: d[i].value });
      }

    }
    this.props.addProductsToQuote(data);
    browserHistory.push(`/EditQuote${this.props.location.search}`);
  }

  render() {
    let products = [];
    products =  _.filter(this.props.products.toJS(),function(item){
          if(!item.productComponent){
            return item;
          }
    });

    const style = this.props.loading ? { display: 'inline' } : this.props.globalLoading ? { display: 'inline' } : { display: 'none' };
    return (
      <div>
        <div className="loader" style={style}></div>
        <Helmet
          title="CPQ - Product Selection"
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
            location={this.props.location}
            data={this.props.products.toJS().map((item) => !item.productComponent ? item.name : '')}
            searchInputChange={this.searchInputChange}
            onSearchClick={this.onSearch}
            onSearchItemSelected={this.onSearchItemSelected}
            language={this.props.language}
            disabledButton={this.state.disabledButton}
            languageChange={this.props.changeLocale}
          />
        </div>
        <div>
          <ProductSelectionGrid
            products={products}
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
  onSearch: PropTypes.func,
  onSearchItemSelected: PropTypes.func,
  loading: PropTypes.any,
  globalLoading: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  ProductSelectionPage: makeSelectProductSelectionPage(),
  showFilter: showFilter(),
  data: getQuoteLines(),
  products: makeProductsData(),
  loading: makeSelectLoading(),
  globalLoading: globalLoading(),
  language: getLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleFilter: (value) => {
      dispatch(showFilteredData(value));
    },
    getProductsData: (groupId, priceBookId, quoteId) => {
      dispatch(loadProductsData(groupId, priceBookId, quoteId));
    },
    addProductsToQuote: (value) => {
      dispatch(addProducts(value));
    },
    onSearch: (searchObj) => {
      dispatch(loadSearchData(searchObj));
    },
    onSearchItemSelected: (value) => {
      dispatch(onSearchItemSelected(value));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectionPage);
