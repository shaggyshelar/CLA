/*
 *
 * ReConfigureProducts reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  DEFAULT_ACTION,
  LOAD_CONFIGURE_PRODUCTS_DATA,
  LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  LOAD_CONFIGURE_PRODUCTS_DATA_ERROR,
  ADD_OPTIONS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  productBundleData: {},
  reConfigureProductData: {},
  fromAddOptions: false,
});

function reConfigureProductsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_CONFIGURE_PRODUCTS_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS: {
      console.log('fromAddOptions get', state.get('fromAddOptions'));
      const reConfigureProducts = {};
      const productBundelData = action.productBundelData;
      if (!_.isUndefined(action.productBundelData) !== undefined && !_.isUndefined(action.productBundelData)) {
        let categories = [];
        let features = [];
        let products = [];
        const linkedFeatures = [];
        const linkedProducts = [];
        categories = productBundelData.productBundle.categories;
        features = productBundelData.productBundle.features;
        products = productBundelData.productBundle.products;
        reConfigureProducts.productBundleId = productBundelData.productBundle.id;
        reConfigureProducts.productBundleName = productBundelData.productBundle.name;
        reConfigureProducts.productBundleQuoteId = productBundelData.productBundle.quoteId;
        reConfigureProducts.categories = [];
        reConfigureProducts.features = [];
        // Categories are available
        if (categories.length > 0) {
          // get all categories
          categories.forEach((category) => {
            let categoryObj = {};
            categoryObj = category;
            categoryObj.features = [];
            if (features.length > 0) {
              features.forEach((feature) => {
                let featureObj = {};
            // get all feature having same cotegory Id
                if (feature.categoryId === category.id) {
                  featureObj = feature;
                  featureObj.products = [];
                  if (products.length > 0) {
                    products.forEach((product) => {
                      let productObj = {};
                    // get all product having same feature Id
                      if (product.featureId === feature.id) {
                        productObj = product;
                        featureObj.products.push(productObj);
                        linkedProducts.push(productObj);
                      }
                    });
                  }
                  categoryObj.features.push(featureObj);
                  linkedFeatures.push(featureObj);
                }
              }, this);
            }
            reConfigureProducts.categories.push(categoryObj);
          }, this);

          const otherFeatures = [];
          const otherProducts = [];
          if (products.length > linkedProducts.length) {
            products.forEach((product) => {
              const index = _.findIndex(linkedProducts, { id: product.id });
              if (index === -1) {
                otherProducts.push(product);
              }
            }, this);
          }
          if (features.length > linkedFeatures.length) {
            features.forEach((feature) => {
              const index = _.findIndex(linkedFeatures, { id: feature.id });
              if (index === -1) {
                let updatedFeature = {};
                updatedFeature = feature;
                updatedFeature.products = [];
                updatedFeature.products = _.filter(otherProducts, { featureId: feature.id });
                _.remove(otherProducts, (currentObject) => currentObject.featureId === feature.id);
                otherFeatures.push(updatedFeature);
              }
            }, this);
          }
           // For Other tab and Other Options
          if (otherFeatures.length > 0 || otherProducts.length > 0) {
            const otherCategory = {};
            otherCategory.id = Math.random();
            otherCategory.name = 'Other';
            otherCategory.features = otherFeatures;
            if (otherProducts.length > 0) {
              const otherOptions = {};
              otherOptions.id = Math.random();
              otherOptions.categoryId = otherCategory.id;
              otherOptions.name = 'Other Options';
              otherOptions.products = [];
              otherOptions.products = otherProducts;
              otherCategory.features.push(otherOptions);
            }
            reConfigureProducts.categories.push(otherCategory);
          }
        } else if (features.length > 0) {    // Only features are available  no categories
          features.forEach((feature) => {
            let featureObj = {};
            featureObj = feature;
            featureObj.products = [];
            if (products.length > 0) {
              products.forEach((product) => {
                let productObj = {};
                    // get all product having same feature Id
                if (product.featureId === feature.id) {
                  productObj = product;
                  featureObj.products.push(productObj);
                  linkedProducts.push(productObj);
                }
              });
            }
            reConfigureProducts.features.push(featureObj);
          }, this);

          const otherProducts = [];
          if (products.length > linkedProducts.length) {
            products.forEach((product) => {
              const index = _.findIndex(linkedProducts, { id: product.id });
              if (index === -1) {
                otherProducts.push(product);
              }
            }, this);
          }
        // For Other Options
          if (otherProducts.length > 0) {
            const otherOptions = {};
            otherOptions.id = Math.random();
            otherOptions.featureId = Math.random();
            otherOptions.name = 'Other Options';
            otherOptions.products = [];
            otherOptions.products = otherProducts;
            reConfigureProducts.features.push(otherOptions);
          }
        } else if (categories.length === 0 && features.length === 0 && products.length > 0) { // Only Products are available
          const otherOptions = {};
          otherOptions.id = Math.random();
          otherOptions.featureId = Math.random();
          otherOptions.name = 'Other Options';
          otherOptions.products = [];
          otherOptions.products = products;
          reConfigureProducts.features.push(otherOptions);
        }
      }
      return state
        .set('productBundleData', action.productBundelData)
        .set('loading', false)
        .set('reConfigureProductData', reConfigureProducts);
    }
    case LOAD_CONFIGURE_PRODUCTS_DATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case ADD_OPTIONS :
      console.log('fromAddOptions reducer', action.fromAddOptions);
      return state
        .set('fromAddOption', action.fromAddOptions);
    default:
      return state;
  }
}

export default reConfigureProductsReducer;

