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
  TOGGLE_CHECKBOX_CHANGE,
  TOGGLE_CHECK_ALL,
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

export function loadProductsData(params) {
  return {
    type: LOAD_PRODUCTS_DATA,
    params,
  };
}

export function toggleCheckbox(id) {
  return {
    type: TOGGLE_CHECKBOX_CHANGE,
    id,
  };
}

export function toggleCheckAll(isCheckAll) {
  return {
    type: TOGGLE_CHECK_ALL,
    isCheckAll,
  };
}
