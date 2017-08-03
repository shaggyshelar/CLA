/*
 *
 * ProductSelectionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_DATA_ERROR,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showFilteredData(data) {
  return {
    type: SHOW_FILTER,
    data,
  };
}

export function loadProductsData() {
  return {
    type: LOAD_PRODUCTS_DATA,
  };
}

export function productsDataLoaded(products) {
  return {
    type: LOAD_PRODUCTS_DATA_SUCCESS,
    products,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

