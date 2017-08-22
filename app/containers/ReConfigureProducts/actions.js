/*
 *
 * ReConfigureProducts actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_CONFIGURE_PRODUCTS_DATA,
  LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  LOAD_CONFIGURE_PRODUCTS_DATA_ERROR,
  ADD_OPTIONS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadReConfigureProductsData() {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA,
  };
}
export function loadReConfigureProductsDataSuccess(productBundelData) {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
    productBundelData,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA_ERROR,
    error,
  };
}

export function loadProductsData() {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA,
  };
}

export function addOptions(value) {
  console.log('value', value);
  return {
    type: ADD_OPTIONS,
    fromAddOptions: value,
  };
}
