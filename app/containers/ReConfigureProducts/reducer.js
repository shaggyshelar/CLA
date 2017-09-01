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
  SAVE_CONFIGURE_PRODUCTS_DATA,
  SAVE_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_CHECKBOX_CHANGE,
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
        reConfigureProducts.productBundleQuoteName = productBundelData.productBundle.quoteName;
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
            otherCategory.id = parseInt(Math.random() * 100000, 0);
            otherCategory.name = 'Other';
            otherCategory.features = otherFeatures;
            // Create Other Options feature
            if (otherProducts.length > 0) {
              const otherOptions = {};
              otherOptions.id = parseInt(Math.random() * 100000, 0);
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
            otherOptions.id = parseInt(Math.random() * 100000, 0);
            otherOptions.name = 'Other Options';
            otherOptions.products = [];
            otherOptions.products = otherProducts;
            reConfigureProducts.features.push(otherOptions);
          }
        } else if (categories.length === 0 && features.length === 0 && products.length > 0) { // Only Products are available
          const otherOptions = {};
          otherOptions.id = Math.random();
          otherOptions.name = 'Other Options';
          otherOptions.products = [];
          otherOptions.products = products;
          reConfigureProducts.features.push(otherOptions);
        }
      }
      return state
        .set('productBundleData', fromJS(action.productBundelData))
        .set('loading', false)
        .set('reConfigureProductData', fromJS(reConfigureProducts));
    }
    case LOAD_CONFIGURE_PRODUCTS_DATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case ADD_OPTIONS : {
      const reConfigureProductData = state.get('reConfigureProductData').toJS();
      if (reConfigureProductData.categories.length > 0) {
        const category = _.find(reConfigureProductData.categories, { id: action.productObj.categoryId });
        if (category) {
          const feature = _.find(category.features, { id: action.productObj.featureId });
          if (feature) {
            action.productObj.selectedProducts.forEach((currentProduct) => {
              const product = currentProduct;
              product.tempId = product.id;
              product.id = parseInt(Math.random() * 100000, 0);
              product.isAdded = true;
              product.isRequired = false;
              product.categoryId = action.productObj.categoryId;
              product.featureId = action.productObj.featureId;
              feature.products.push(product);
            }, this);
          }
        }
      } else if (reConfigureProductData.features.length > 0) {
        const feature = _.find(reConfigureProductData.features, { id: action.productObj.featureId });
        if (feature) {
          action.productObj.selectedProducts.forEach((currentProduct) => {
            const product = currentProduct;
            product.tempId = product.id;
            product.isAdded = true;
            product.isRequired = false;
            product.id = parseInt(Math.random() * 100000, 0);
            product.categoryId = action.productObj.categoryId;
            product.featureId = action.productObj.featureId;
            feature.products.push(product);
          }, this);
        }
      }
      return state
        .set('reConfigureProductData', fromJS(reConfigureProductData));
    }
    case SAVE_CONFIGURE_PRODUCTS_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case SAVE_CONFIGURE_PRODUCTS_DATA_SUCCESS:
      return state
      .set('productBundleData', fromJS(action.data))
      .set('loading', false);
    case DELETE_PRODUCT: {
      const reConfigureProduct = state.get('reConfigureProductData').toJS();
      if (reConfigureProduct.categories.length > 0) {
        const category = _.find(reConfigureProduct.categories, { id: action.product.categoryId });
        if (category) {
          const feature = _.find(category.features, { id: action.product.featureId });
          if (feature) {
            const product = _.find(feature.products, { id: action.product.id });
            if (product) {
              if (product.isAdded) {
                _.remove(feature.products, (currentObject) => currentObject.id === action.product.id);
              } else {
                product.isDeleted = true;
              }
            }
          }
        }
      } else if (reConfigureProduct.features.length > 0) {
        const feature = _.find(reConfigureProduct.features, { id: action.product.featureId });
        if (feature) {
          const product = _.find(feature.products, { id: action.product.id });
          if (product) {
            if (product.isAdded) {
              _.remove(feature.products, (currentObject) => currentObject.id === action.product.id);
            } else {
              product.isDeleted = true;
            }
          }
        }
      }
      return state
        .set('reConfigureProductData', fromJS(reConfigureProduct));
    }
    case UPDATE_PRODUCT:
      {
        const reConfigureProduct = state.get('reConfigureProductData').toJS();
        if (reConfigureProduct.categories.length > 0) {
          const category = _.find(reConfigureProduct.categories, { id: action.productObj.categoryId });
          if (category) {
            const feature = _.find(category.features, { id: action.productObj.featureId });
            if (feature) {
              const product = _.find(feature.products, { id: parseInt(action.productObj.id, 0) });
              if (product) {
                product[action.productObj.field].value = action.productObj.value;
              }
            }
          }
        } else if (reConfigureProduct.features.length > 0) {
          const feature = _.find(reConfigureProduct.features, { id: action.product.featureId });
          if (feature) {
            const product = _.find(feature.products, { id: parseInt(action.productObj.id, 0) });
            if (product) {
              product[action.productObj.field].value = action.productObj.value;
            }
          }
        }
        return state
        .set('reConfigureProductData', fromJS(reConfigureProduct));
      }
    case TOGGLE_CHECKBOX_CHANGE: {
      const reConfigureProduct = state.get('reConfigureProductData').toJS();
      if (reConfigureProduct.categories.length > 0) {
        const category = _.find(reConfigureProduct.categories, { id: action.product.categoryId });
        if (category) {
          const feature = _.find(category.features, { id: action.product.featureId });
          if (feature) {
            const product = _.find(feature.products, { id: action.product.id });
            if (product) {
              product.isSelected = !product.isSelected;
            }
          }
        }
      } else if (reConfigureProduct.features.length > 0) {
        const feature = _.find(reConfigureProduct.features, { id: action.product.featureId });
        if (feature) {
          const product = _.find(feature.products, { id: action.product.id });
          if (product) {
            product.isSelected = !product.isSelected;
          }
        }
      }
      return state
        .set('reConfigureProductData', fromJS(reConfigureProduct));
    }
    default:
      return state;
  }
}

export default reConfigureProductsReducer;

