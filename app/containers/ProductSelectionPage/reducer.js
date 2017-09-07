/*
 *
 * ProductSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_DATA_ERROR,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_BTN_DATA_SUCCESS,
  LOAD_SEARCH_ITEM_SELECTED,
} from './constants';

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  products: [],
  searchedProducts: [],
});

function productSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_FILTER:
      return state
        .set('showFilter', action.data);
    case LOAD_PRODUCTS_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('products', fromJS(action.products.products))
        .set('searchedProducts', fromJS(action.products.products))
        .set('loading', false);
    }
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_SEARCH_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SEARCH_DATA_SUCCESS:
      return state
        .set('searchedProducts', fromJS(action.searchedProducts.products))
        .set('loading', false);
    case LOAD_SEARCH_BTN_DATA_SUCCESS: {
      return state
        .set('searchedProducts', fromJS(action.searchedProducts.products))
        .set('products', fromJS(action.searchedProducts.products))
        .set('loading', false);
    }
    case LOAD_SEARCH_ITEM_SELECTED: {
      const searchedProducts = state.get('searchedProducts').toJS();
      let products = state.get('products').toJS();
      let selectedProducts = [];
      if (action.name) {
        if (searchedProducts && searchedProducts.length > 0) {
          const product = _.find(searchedProducts, { name: action.name });
          if (product) {
            selectedProducts.push(product);
            products = selectedProducts;
          }
        } else {
          selectedProducts = state.get('products').toJS();
          products = selectedProducts;
        }
      }
      return state
        .set('searchedProducts', fromJS(selectedProducts))
        .set('products', fromJS(products))
        .set('loading', false);
    }

    default:
      return state;
  }
}

export default productSelectionPageReducer;
