/*
 *
 * ReConfigureProducts actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_CONFIGURE_PRODUCTS_DATA,
  LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  CANCEL,
  CONTINUE,
  LOAD_CONFIGURE_PRODUCTS_DATA_ERROR,
  ADD_OPTIONS,
  SAVE_CONFIGURE_PRODUCTS_DATA,
  SAVE_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_CHECKBOX_CHANGE,
  TOGGLE_ADDOPTIONS_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadReConfigureProductsData(data) {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA,
    data,
  };
}
export function loadReConfigureProductsDataSuccess(productBundelData) {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
    productBundelData,
  };
}

export function cancel() {
  return {
    type: CANCEL,
  };
}

export function continueSave() {
  return {
    type: CONTINUE,
  };
}

export function reconfigureDataLoadingError(error) {
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

export function addOptions(productObj) {
  return {
    type: ADD_OPTIONS,
    productObj,
  };
}

export function saveConfiguredProductsData(data, locationQuery) {
  return {
    type: SAVE_CONFIGURE_PRODUCTS_DATA,
    data,
    locationQuery,
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

export function updateProduct(productObj) {
  return {
    type: UPDATE_PRODUCT,
    productObj,
  };
}

export function toggleCheckboxChange(product) {
  return {
    type: TOGGLE_CHECKBOX_CHANGE,
    product,
  };
}

export function toggleAddOptionsState(fromAddOptions, activeTab) {
  return {
    type: TOGGLE_ADDOPTIONS_STATE,
    fromAddOptions,
    activeTab,
  };
}
