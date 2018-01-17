/*
 *
 * ProductSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_DATA_ERROR,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_FILTERED_PRODUCTS_DATA_SUCCESS,
  LOAD_SEARCH_DATA,
  FILTER_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_BTN_DATA_SUCCESS,
  LOAD_SEARCH_ITEM_SELECTED,
} from './constants';

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  products: [],
  initialProducts: [],
});

function productSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_FILTER:
      return state
        .set('showFilter', action.data);
    case LOAD_PRODUCTS_DATA:
      toast.dismiss();
      return state
        .set('loading', true)
        .set('guidedSellingQuestions', fromJS([]))
        .set('error', false);
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('products', fromJS(action.products.products))
        .set('guidedSellingQuestions', fromJS(action.products.guidedSelling ? action.products.guidedSelling.quoteProcesses : []))
        .set('initialProducts', fromJS(action.products.products))
        .set('loading', false);
    }
    case LOAD_FILTERED_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('products', fromJS(action.products.products))
        .set('guidedSellingQuestions', fromJS(action.products.guidedSelling ? action.products.guidedSelling.quoteProcesses : []))
        .set('loading', false);
    }
    case LOAD_DATA_ERROR:
      toast.dismiss();
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_SEARCH_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case FILTER_SEARCH_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SEARCH_DATA_SUCCESS:
      return state
        .set('loading', false);
    case LOAD_SEARCH_BTN_DATA_SUCCESS: {
      let products = state.get('initialProducts').toJS();
      if (!action.emptySearch) {
        products = action.searchedProducts.products;
      }
      return state
        .set('products', fromJS(products))
        .set('loading', false);
    }
    case LOAD_SEARCH_ITEM_SELECTED: {
      const initialProducts = state.get('initialProducts').toJS();
      let selectedProducts = [];
      if (action.name) {
        if (initialProducts && initialProducts.length > 0) {
          const product = _.find(initialProducts, { name: action.name });
          if (product) {
            selectedProducts.push(product);
          }
        } else {
          selectedProducts = state.get('products').toJS();
        }
      } else {
        selectedProducts = state.get('products').toJS();
      }
      return state
        .set('products', fromJS(selectedProducts))
        .set('loading', false);
    }

    default:
      return state;
  }
}

export default productSelectionPageReducer;
