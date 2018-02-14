/*
 *
 * ReConfigureProducts reducer
 *
 */
import { generateGuid } from 'containers/App/constants';
import { fromJS } from 'immutable';
import React from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
  DEFAULT_ACTION,
  LOAD_CONFIGURE_PRODUCTS_DATA,
  LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  LOAD_CONFIGURE_PRODUCTS_DATA_ERROR,
  ADD_OPTIONS,
  CANCEL,
  CONTINUE,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_CHECKBOX_CHANGE,
  TOGGLE_ADDOPTIONS_STATE,
  SAVE_CONFIGURE_PRODUCTS_DATA,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  errorMessage: '',
  productBundleData: {},
  reConfigureProductData: {},
  fromAddOptions: false,
  activeTab: 0,
  quoteData: {},
});
function reConfigureProductsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CANCEL:
      return state
        .set('error', false)
        .set('errorMessage', '');
    case CONTINUE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('errorMessage', '');
    case LOAD_CONFIGURE_PRODUCTS_DATA:
      toast.dismiss();
      return state
        .set('loading', true)
        .set('error', false)
        .set('errorMessage', '');
    case LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS: {
      const reConfigureProducts = {};
      const productBundelData = action.productBundelData.quoteProductData;
      const quoteData = action.productBundelData.quoteProductData.quote;
      if (!_.isUndefined(action) && !_.isUndefined(action.productBundelData) && !_.isUndefined(action.productBundelData.quoteProductData)) {
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
        reConfigureProducts.quoteLineId = productBundelData.productBundle.lineId;
        reConfigureProducts.groupId = productBundelData.productBundle.groupId;
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
                        productObj.isDeleted = false;
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
                const productObj = product;
                productObj.isDeleted = false;
                otherProducts.push(productObj);
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
            otherCategory.id = 'o1t2h3e4r5';
            otherCategory.name = 'Other';
            // otherCategory.features = otherFeatures;
            otherCategory.features = [];
            otherFeatures.forEach((feature) => {
              let updatedFeature = {};
              updatedFeature = feature;
              updatedFeature.categoryId = otherCategory.id;
              otherCategory.features.push(updatedFeature);
            }, this);
            // Create Other Options feature
            if (otherProducts.length > 0) {
              const otherOptions = {};
              otherOptions.id = 'o1t2h3e4r5o6p7t8i9o0n123';
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
                  productObj.isDeleted = false;
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
                const productObj = product;
                productObj.isDeleted = false;
                otherProducts.push(productObj);
              }
            }, this);
          }
        // For Other Options
          if (otherProducts.length > 0) {
            const otherOptions = {};
            otherOptions.id = 'o1t2h3e4r5o6p7t8i9o0n123';
            otherOptions.name = 'Other Options';
            otherOptions.products = [];
            otherOptions.products = otherProducts;
            reConfigureProducts.features.push(otherOptions);
          }
        } else if (categories.length === 0 && features.length === 0 && products.length > 0) { // Only Products are available
          const otherOptions = {};
          otherOptions.id = 'o1t2h3e4r5o6p7t8i9o0n123';
          otherOptions.name = 'Other Options';
          otherOptions.products = [];
        //  otherOptions.products = products;
          products.forEach((product) => {
            const productObj = product;
            productObj.isDeleted = false;
            if (productObj.isVisible) {
              otherOptions.products.push(productObj);
            }
          }, this);
          reConfigureProducts.features.push(otherOptions);
        }
      }
      return state
        .set('productBundleData', fromJS(action.productBundelData.quoteProductData.productBundle))
        .set('quoteData', fromJS(quoteData))
        .set('loading', false)
        .set('reConfigureProductData', fromJS(reConfigureProducts))
        .set('activeTab', 0);
    }
    case LOAD_CONFIGURE_PRODUCTS_DATA_ERROR: {
      toast.dismiss();
      let error = false;
      let errorMsg = false;
      if (action.error && action.error instanceof Array) {
        action.error.map((errorObject) => {
          if (errorObject.type === 'alert') {
            error = true;
            errorMsg = errorObject.message;
          } else {
            toast.error(<p>{errorObject.message}</p>, {
              position: toast.POSITION.TOP_LEFT,
              autoClose: false,
            });
          }
          return this;
        });
      } else {
        toast.error('Something went wrong.', {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
        });
      }
      return state
        .set('error', error)
        .set('errorMessage', errorMsg)
        .set('loading', false);
    }
    case ADD_OPTIONS : {
      const reConfigureProductData = state.get('reConfigureProductData').toJS();
      if (reConfigureProductData && reConfigureProductData.categories) {
        if (reConfigureProductData.categories.length > 0) {
          const category = _.find(reConfigureProductData.categories, { id: action.productObj.categoryId });
          if (category) {
            const feature = _.find(category.features, { id: action.productObj.featureId });
            if (feature) {
              action.productObj.selectedProducts.forEach((currentProduct) => {
                const product = currentProduct;
                product.isAdded = true;
                product.tempId = product.id;
                product.id = generateGuid();
                product.isDeleted = false;
                product.isSelected = true;
                product.isRequired = false;
                product.categoryId = action.productObj.categoryId;
                product.featureId = action.productObj.featureId;
                product.parentId = reConfigureProductData.productBundleId;
                product.parentLineId = reConfigureProductData.quoteLineId;
                feature.products.push(product);
              }, this);
            }
          }
        } else if (reConfigureProductData.features.length > 0) {
          const feature = _.find(reConfigureProductData.features, { id: action.productObj.featureId });
          if (feature) {
            action.productObj.selectedProducts.forEach((currentProduct) => {
              const product = currentProduct;
              product.isAdded = true;
              product.tempId = product.id;
              product.id = generateGuid();
              product.isDeleted = false;
              product.isSelected = true;
              product.isRequired = false;
              product.categoryId = action.productObj.categoryId;
              product.featureId = action.productObj.featureId;
              product.parentId = reConfigureProductData.productBundleId;
              product.parentLineId = reConfigureProductData.quoteLineId;
              feature.products.push(product);
            }, this);
          }
        }
      }
      return state
        .set('reConfigureProductData', fromJS(reConfigureProductData));
    }
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
                product.isSelected = false;
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
              product.isSelected = false;
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
              const product = _.find(feature.products, { id: action.productObj.id });
              if (product) {
                product[action.productObj.field].value = action.productObj.value;
              }
            }
          }
        } else if (reConfigureProduct.features.length > 0) {
          const feature = _.find(reConfigureProduct.features, { id: action.productObj.featureId });
          if (feature) {
            const product = _.find(feature.products, { id: action.productObj.id });
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
              const categoryArray = [];
              reConfigureProduct.categories.forEach((categoryData) => {
                const categoryObj = categoryData;
                const featureArray = [];
                categoryData.features.forEach((featureData) => {
                  const featureObj = featureData;
                  const productArray = [];
                  featureData.products.forEach((productData) => {
                    const productObj = productData;
                    const selectedDependentItems = [];
                    const selectedExclusionItems = [];
                    if (productObj.dependencyList.length > 0) {
                      productObj.dependencyList.forEach((dependentProduct) => {
                        reConfigureProduct.categories.forEach((reconfigureCategoryData) => {
                          reconfigureCategoryData.features.forEach((reconfigureFeatureData) => {
                            reconfigureFeatureData.products.forEach((reconfigureProductData) => {
                              if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isDependent) {
                                selectedDependentItems.push(reconfigureProductData.isSelected);
                              }
                              if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isExclusion) {
                                selectedExclusionItems.push(reconfigureProductData.isSelected);
                              }
                            });
                          });
                        });
                      });

                      if (!productObj.isRequired) {
                        const filteredDependentArray = selectedDependentItems.filter((value) => value === false);
                        if (selectedDependentItems.length === filteredDependentArray.length && selectedDependentItems.length !== 0) {
                          productObj.isDisable = true;
                          productObj.isSelected = false;
                        } else {
                          productObj.isDisable = false;
                        }

                        const filteredExclusionArray = selectedExclusionItems.filter((value) => value === true);
                        if (filteredExclusionArray.length !== 0) {
                          if (filteredExclusionArray.length > 0) {
                            productObj.isDisable = true;
                            productObj.isSelected = false;
                          } else {
                            productObj.isDisable = false;
                          }
                        }
                      }
                    }
                    productArray.push(productObj);
                  });
    //              isDeleted = false;
    //              else if (productObj.isExclusion && productObj.dependentProductId === product.id) {
    //               if (productObj.isAdded) {
    //                 isDeleted = true;
    //               }
    //              if (!isDeleted) {
    //                productArray.push(productObj);
    //              }
                  featureObj.products = productArray;
                  featureArray.push(featureObj);
                });
                categoryObj.features = featureArray;
                categoryArray.push(categoryObj);
              });
              reConfigureProduct.categories = categoryArray;
            }
          }
        }
      } else if (reConfigureProduct.features.length > 0) {
        const feature = _.find(reConfigureProduct.features, { id: action.product.featureId });
        if (feature) {
          const product = _.find(feature.products, { id: action.product.id });
          if (product) {
            product.isSelected = !product.isSelected;
            const featureArray = [];
            reConfigureProduct.features.forEach((featureData) => {
              const featureObj = featureData;
              const productArray = [];
              featureData.products.forEach((productData) => {
                const productObj = productData;
                const selectedDependentItems = [];
                const selectedExclusionItems = [];
                // Get status (isSelected) of dependent and exclusion product by comparing it with each product.
                if (productObj.dependencyList.length > 0) {
                  productObj.dependencyList.forEach((dependentProduct) => {
                    reConfigureProduct.features.forEach((reconfigureFeatureData) => {
                      reconfigureFeatureData.products.forEach((reconfigureProductData) => {
                        if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isDependent) {
                          selectedDependentItems.push(reconfigureProductData.isSelected);
                          // Push true and false value of dependent product
                          // ex. selectedDependentItems = [true, false]
                        }
                        if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isExclusion) {
                          selectedExclusionItems.push(reconfigureProductData.isSelected);
                           // Push true and false value of exclusion product
                           // ex. selectedExclusionItems = [true, false]
                        }
                      });
                    });
                  });
                  // Avoid applying dependent and exclusion rule on required product.
                  if (!productObj.isRequired) {
                    // For Dependent Product
                    // Get product with status false
                    // ex. filteredDependentArray = [false]
                    const filteredDependentArray = selectedDependentItems.filter((value) => value === false);
                    // Compare length of selectedDependentItems and filteredDependentArray to update value of disable and isSelected property
                    if (selectedDependentItems.length === filteredDependentArray.length && selectedDependentItems.length !== 0) {
                      productObj.isDisable = true;
                      productObj.isSelected = false;
                    } else {
                      productObj.isDisable = false;
                    }
                    // For Exclusion Product
                    // Get product with status true
                    // ex. filteredDependentArray = [true]

                    const filteredExclusionArray = selectedExclusionItems.filter((value) => value === true);
                    // FilteredExclusionArray is having length greater than zero then update  value of disable and isSelected property
                    if (filteredExclusionArray.length !== 0) {
                      if (filteredExclusionArray.length > 0) {
                        productObj.isDisable = true;
                        productObj.isSelected = false;
                      } else {
                        productObj.isDisable = false;
                      }
                    }
                  }
                }
                productArray.push(productObj);
              });
              featureObj.products = productArray;
              featureArray.push(featureObj);
            });
            reConfigureProduct.features = featureArray;
          }
        }
      }
      let updatedState;
      if (action.product.applyImmediately) {
        updatedState = state
        .set('reConfigureProductData', fromJS(reConfigureProduct))
        .set('loading', true);
      } else {
        updatedState = state
        .set('reConfigureProductData', fromJS(reConfigureProduct));
      }
      return updatedState;
    }

    case TOGGLE_ADDOPTIONS_STATE: {
      let activeTab = 0;
      if (action.activeTab) {
        activeTab = action.activeTab;
      } else {
        activeTab = action.activeTab;
      }
      return state
        .set('fromAddOptions', action.fromAddOptions)
        .set('activeTab', activeTab);
    }
    case SAVE_CONFIGURE_PRODUCTS_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    default:
      return state;
  }
}

export default reConfigureProductsReducer;

