/*
 *
 * AddConfigureProducts reducer
 *
 */

import { fromJS } from 'immutable';
import { toast } from 'react-toastify';
import {
  DEFAULT_ACTION,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  productsData: {},
});

function addConfigureProductsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_PRODUCTS_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('productsData', fromJS(action.productsData))
        .set('loading', false);
    }
    case LOAD_PRODUCTS_DATA_ERROR: {
      if (action.error) {
        action.error.map((i) => {
          toast.error(i.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          return this;
        });
      } else {
        toast.error('Server connection problem ! Please try again later.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default addConfigureProductsReducer;
