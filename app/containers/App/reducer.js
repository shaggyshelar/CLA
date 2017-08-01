/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
// The initial state of the App
import {
  SAVE_ACTION,
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  CLONE_LINE,
  DELETE_LINE,
  LOAD_DATA_ERROR,
  LOAD_XRM_DATA,
  LOAD_XRM_DATA_SUCCESS,
  ADD_PRODUCTS,
} from './constants';
const initialState = fromJS({
  loading: false,
  error: false,
  showPrice: false,
  data: {
    priceList: null,
    products: [],
  },
});

function appReducer(state = initialState, action) {
  let data = state.get('data');
  switch (action.type) {
    case SAVE_ACTION:
      data.priceList = action.data;
      return state.set('data', data);
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('data', action.data)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CLONE_LINE:
      data = state.getIn(['data']);
      return state.setIn(['data'], { priceList: data.priceList, products: data.products.splice(0, data.products.length).concat(action.data) });
    case ADD_PRODUCTS:
      data = state.getIn(['data']);
      const d = {};
      d.priceList = data.priceList;
      d.products = data.products.concat(action.data);
      return state.set('data', d);
    case DELETE_LINE:
      data = state.getIn(['data']);
      return state.setIn(['data'], { priceList: data.priceList, products: data.products.splice(0, data.products.length).concat(action.data) });
    case LOAD_XRM_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('xrmData', false);
    case LOAD_XRM_DATA_SUCCESS:
      return state
        .set('xrmData', action.xrmData)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
