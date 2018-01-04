/*
 *
 * AddConfigureProducts reducer
 *
 */

import { fromJS } from 'immutable';
import React from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {
  DEFAULT_ACTION,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_ERROR,
  TOGGLE_CHECKBOX_CHANGE,
  TOGGLE_CHECK_ALL,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  productsData: {},
});

function addConfigureProductsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_PRODUCTS_DATA:
      toast.dismiss();
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('productsData', fromJS(action.productsData))
        .set('loading', false);
    }
    case LOAD_PRODUCTS_DATA_ERROR: {
      toast.dismiss();
      if (action.error) {
        action.error.map((i) => {
          toast.error(<p>{i.message}</p>, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false,
          });
          return this;
        });
      } else {
        toast.error('Server connection problem ! Please try again later.', {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
        });
      }
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case TOGGLE_CHECKBOX_CHANGE: {
      const productsDataObj = state.get('productsData').toJS();
      if (action.id) {
        const product = _.find(productsDataObj.products, { id: action.id });
        if (product) {
          product.isSelected = !product.isSelected;
          const productArray = [];
          productsDataObj.products.forEach((productData) => {
            const productObj = productData;
            const selectedDependentItems = [];
            const selectedExclusionItems = [];
            if (productObj.dependencyList.length > 0) {
              const dependentExclusionItems = _.filter(productObj.dependencyList, (item) => item.isDependent || item.isExclusion);
              if (dependentExclusionItems.length > 0) {
                productObj.dependencyList.forEach((dependentProduct) => {
                  productsDataObj.products.forEach((reconfigureProductData) => {
                    if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isDependent) {
                      selectedDependentItems.push(reconfigureProductData.isSelected);
                    }
                    if (reconfigureProductData.id === dependentProduct.dependentProductId && dependentProduct.isExclusion) {
                      selectedExclusionItems.push(reconfigureProductData.isSelected);
                    }
                  });
                });

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
            // if (productObj.isExclusion && productObj.isDependent && productObj.dependentProductId === product.id) {
            //   productObj.isDisable = true;
            // } else if (productObj.isExclusion && productObj.dependentProductId === product.id) {
            //   productObj.isDisable = !productObj.isDisable;
            // } else if (productObj.isDependent && productObj.dependentProductId === product.id) {
            //   productObj.isDisable = !productObj.isDisable;
            //   productObj.isSelected = false;
            // }
            productArray.push(productObj);
          });
          productsDataObj.products = productArray;
        }
      }
      return state
        .set('productsData', fromJS(productsDataObj));
    }
    case TOGGLE_CHECK_ALL: {
      const productObj = state.get('productsData').toJS();
      const updatedProducts = [];
      productObj.products.forEach((item) => {
        const product = item;
        product.isSelected = action.isCheckAll;
        updatedProducts.push(product);
      }, this);
      productObj.products = updatedProducts;
      return state
        .set('productsData', fromJS(productObj));
    }
    default:
      return state;
  }
}

export default addConfigureProductsReducer;
