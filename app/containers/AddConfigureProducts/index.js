import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import AddConfigureProductHeader from 'components/AddConfigureProductHeader';
import AddConfigureProductGrid from 'components/AddConfigureProductGrid';
import { createStructuredSelector } from 'reselect';
import { makeSelectAddConfigureProducts, makeProductsData, makeSelectLoading, makeSelectError, getLanguage } from './selectors';
import { loadProductsData } from './actions';
import { addOptions } from '../ReConfigureProducts/actions';
import { changeLocale } from '../LanguageProvider/actions';

export class AddConfigureProducts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      products: [],
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.addOptions = this.addOptions.bind(this);
  }

  componentDidMount() {
    const params = {
      featureId: this.props.location.query.featureId,
      bundleId: this.props.location.query.bundleId,
      priceBookId: this.props.location.query.priceBookId,
    };

    this.props.getProductsData(params);
  }

  addOptions() {
    const products = this.props.productsData.toJS().products ? this.props.productsData.toJS().products : [];
    const productObj = {
      selectedProducts: [],
      featureId: this.props.location.query.featureId,
      categoryId: this.props.location.query.categoryId,
    };
    this.state.selectedProducts = _.uniq(this.state.selectedProducts);
    this.state.selectedProducts.forEach((currentProductId) => {
      const productIndex = _.findIndex(products, { id: currentProductId });
      productObj.selectedProducts.push(products[productIndex]);
    }, this);
    this.props.addOptions(productObj);
    browserHistory.goBack();
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
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

  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    // const data = this.state.selectedQuotes;
    if (!e.target.checked) {
      _.remove(this.state.selectedProducts, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      this.state.selectedProducts.push(e.target.value);
    }
  }

  render() {
    const quoteName = this.props.location.query.quoteName;
    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    if (this.props.loading) {
      return (<div className="loader" style={style}></div>);
    }
    return (
      <div>
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <AddConfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
            addOptions={this.addOptions}
            quoteName={quoteName}
            language={this.props.language}
            languageChange={this.props.changeLocale}
          />
          <div className="qoute-container">
            <AddConfigureProductGrid
              products={this.props.productsData.toJS().products ? this.props.productsData.toJS().products : []}
              showFilter={this.props.showFilter}
              toggleSidebar={this.toggleSidebar}
              toggleCheckboxChange={this.toggleCheckboxChange}
              addProductsWait={this.addProductsWait}
              checkAll={this.state.checkAll}
              toggleCheckAll={this.checkAll}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  getProductsData: PropTypes.func,
  productsData: PropTypes.any,
  addOptions: PropTypes.func,
  location: PropTypes.any,
  loading: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  AddConfigureProducts: makeSelectAddConfigureProducts(),
  productsData: makeProductsData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  language: getLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: (params) => {
      dispatch(loadProductsData(params));
    },
    addOptions: (productObj) => {
      dispatch(addOptions(productObj));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConfigureProducts);
