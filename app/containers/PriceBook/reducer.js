/*
 *
 * PriceBook reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SAVE_ACTION,
} from './constants';

const initialState = fromJS({
  showPrice: true,
});


function priceBookReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SAVE_ACTION:
      return state.set('showPrice', false);
    default:
      return state;
  }
}

export default priceBookReducer;
