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
  SAVE_CONFIGURE_PRODUCTS_DATA,
  SAVE_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  DELETE_PRODUCT,
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
  return {
    type: ADD_OPTIONS,
    fromAddOptions: value,
  };
}

export function saveConfiguredProductsData(data) {
  return {
    type: SAVE_CONFIGURE_PRODUCTS_DATA,
    data,
  };
}

export function configuredProductsSaveSuccess(data) {
  return {
    type: SAVE_CONFIGURE_PRODUCTS_DATA_SUCCESS,
    data,
  };
}

export function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product,
  };
}
