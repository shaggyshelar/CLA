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
  LOAD_SEARCH_DATA,
  FILTER_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_BTN_DATA_SUCCESS,
  LOAD_SEARCH_ITEM_SELECTED,
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

export function loadProductsData(groupId, priceBookId, quoteId) {
  return {
    type: LOAD_PRODUCTS_DATA,
    groupId,
    priceBookId,
    quoteId,
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

export function loadSearchData(searchObj) {
  return {
    type: LOAD_SEARCH_DATA,
    searchObj,
  };
}

export function filterSearchData(searchObj) {
  return {
    type: FILTER_SEARCH_DATA,
    searchObj,
  };
}

export function searchedDataLoaded(searchedProducts) {
  return {
    type: LOAD_SEARCH_DATA_SUCCESS,
    searchedProducts,
  };
}

export function searchBtnDataLoaded(searchedProducts, emptySearch) {
  return {
    type: LOAD_SEARCH_BTN_DATA_SUCCESS,
    searchedProducts,
    emptySearch,
  };
}

export function onSearchItemSelected(name) {
  return {
    type: LOAD_SEARCH_ITEM_SELECTED,
    name,
  };
}
