/*
 *
 * AddConfigureProducts actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProductsDataSuccess(productsData) {
  return {
    type: LOAD_PRODUCTS_DATA_SUCCESS,
    productsData,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_PRODUCTS_DATA_ERROR,
    error,
  };
}

export function loadProductsData(featureId) {
  return {
    type: LOAD_PRODUCTS_DATA,
    featureId,
  };
}
