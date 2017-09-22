
/*
 *
 * ReConfigureProducts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReconfigureProductTab from 'components/ReconfigureProductTab';
import ReconfigureProductHeader from 'components/ReconfigureProductHeader';
import { makeSelectReConfigureProducts, getProductBundle, getReConfigureProductData, getAddOptionState, getActiveTabState, makeSelectLoading, makeSelectError, getLanguage } from './selectors';
import { loadReConfigureProductsData, saveConfiguredProductsData, deleteProduct, updateProduct, toggleCheckboxChange, toggleAddOptionsState } from './actions';
import { changeLocale } from '../LanguageProvider/actions';

export class ReConfigureProducts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      dataProd: [
        {
          _id: '596db79f58d3f94623033cd0',
          code: 'Tillman',
          name: 'Bradley',
          description: '',
          unitPrice: '$ 650.325',
          quantity: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          code: 'Hernandez',
          name: 'Holman',
          description: '',
          unitPrice: '$ 506.595',
          quantity: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          code: 'Burch',
          name: 'Collins',
          description: '',
          unitPrice: '$ 563.00',
          quantity: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          code: 'Coleman',
          name: 'Hunter',
          description: '',
          unitPrice: '$ 900.323',
          quantity: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          code: 'Lorene',
          name: 'Brennan',
          description: '',
          quantity: 77.3144,
          unitPrice: '$ 230.653',
        },
      ],
      reConfigureData: {},
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.saveProducts = this.saveProducts.bind(this);
  }

  componentDidMount() {
    if (!this.props.fromAddOption) {
      const data = {
        productId: this.props.location.query.productId,
        quoteId: this.props.location.query.quoteId,
        priceBookId: this.props.location.query.priceBookId,
        quoteLineId: this.props.location.query.quoteLineId,
        groupId: this.props.location.query.groupId,
      };
      this.props.getProductsData(data);
    } else {
      this.props.toggleAddOptionsState(false);
    }
  }

  saveProducts() {
    const updatedProducts = [];
    const intialProductBundleData = this.props.productBundleData.toJS();
    const updatedProductBundleData = this.props.reConfigureProductData.toJS();
    if (updatedProductBundleData.categories.length > 0) {
      updatedProductBundleData.categories.forEach((category) => {
        category.features.forEach((feature) => {
          feature.products.forEach((currrentProduct) => {
            const product = currrentProduct;
            if (product.tempId) {
              product.id = product.tempId;
            }
            if (category.name === 'Other') {
              product.categoryId = null;
            }
            if (feature.name === 'Other Options') {
              product.featureId = null;
            }
            updatedProducts.push(product);
          }, this);
        }, this);
      }, this);
    } else if (updatedProductBundleData.features.length > 0) {
      updatedProductBundleData.features.forEach((feature) => {
        feature.products.forEach((currrentProduct) => {
          const product = currrentProduct;
          if (product.tempId) {
            product.id = product.tempId;
          }
          if (feature.name === 'Other Options') {
            product.featureId = null;
          }
          updatedProducts.push(product);
        }, this);
      }, this);
    }

    intialProductBundleData.productBundle.products = [];
    intialProductBundleData.productBundle.products = updatedProducts;
    this.props.saveConfiguredProducts(intialProductBundleData.productBundle);
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }


  toggleCheckboxChange(productObj) {
    this.props.toggleCheckboxChange(productObj);
  }

  render() {
    const reconfigurationData = this.props.reConfigureProductData.toJS();
    const params = {
      bundleId: reconfigurationData.productBundleId,
      quoteName: this.props.location.query.quoteName,
      priceBookId: this.props.location.query.priceBookId,
      quoteId: reconfigurationData.productBundleQuoteId,
      bundleLineId: reconfigurationData.quoteLineId,
      groupId: reconfigurationData.groupId,
    };
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
          <ReconfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
            saveProducts={this.saveProducts}
            quoteName={params.quoteName}
            language={this.props.language}
            languageChange={this.props.changeLocale}
          />
          <ReconfigureProductTab
            reConfigureData={this.props.reConfigureProductData.toJS()}
            dataProd={this.state.dataProd}
            products={this.props.dataProd}
            showFilter={this.props.showFilter}
            toggleSidebar={this.toggleSidebar}
            toggleCheckboxChange={this.toggleCheckboxChange}
            addProductsWait={this.addProductsWait}
            checkAll={this.state.checkAll}
            toggleCheckAll={this.checkAll}
            deleteProduct={this.props.deleteProduct}
            updateField={this.props.updateField}
            params={params}
            toggleAddOptionsState={this.props.toggleAddOptionsState}
            activeTab={this.props.activeTab}
          />
        </div>
      </div>
    );
  }
}

ReConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  dataProd: PropTypes.any,
  reConfigureProductData: PropTypes.any,
  productBundleData: PropTypes.any,
  getProductsData: PropTypes.func,
  saveConfiguredProducts: PropTypes.func,
  deleteProduct: PropTypes.func,
  location: PropTypes.any,
  updateField: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  fromAddOption: PropTypes.any,
  toggleAddOptionsState: PropTypes.any,
  activeTab: PropTypes.any,
  loading: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  ReConfigureProducts: makeSelectReConfigureProducts(),
  productBundleData: getProductBundle(),
  reConfigureProductData: getReConfigureProductData(),
  fromAddOption: getAddOptionState(),
  activeTab: getActiveTabState(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  language: getLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: (data) => {
      dispatch(loadReConfigureProductsData(data));
    },
    saveConfiguredProducts: (data) => {
      dispatch(saveConfiguredProductsData(data));
    },
    deleteProduct: (product) => {
      dispatch(deleteProduct(product));
    },
    updateField: (productObj) => {
      dispatch(updateProduct(productObj));
    },
    toggleCheckboxChange: (productObj) => {
      dispatch(toggleCheckboxChange(productObj));
    },
    toggleAddOptionsState: (fromAddOption, activeTab) => {
      dispatch(toggleAddOptionsState(fromAddOption, activeTab));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReConfigureProducts);
