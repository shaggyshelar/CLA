/*
 *
 * ReConfigureProducts actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_CONFIGURE_PRODUCTS_DATA,
  LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadConfigureProductsData() {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA,
  };
}
export function loadConfigureProductsDataSuccess() {
  return {
    type: LOAD_CONFIGURE_PRODUCTS_DATA_SUCCESS,
  };
}

