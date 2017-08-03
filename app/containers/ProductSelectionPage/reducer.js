/*
 *
 * ProductSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_DATA_ERROR,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  products: [],
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
        .set('error', false)
        .setIn('products', false);
    case LOAD_PRODUCTS_DATA_SUCCESS:
      return state
        .set('products', action.products)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    default:
      return state;
  }
}

export default productSelectionPageReducer;
