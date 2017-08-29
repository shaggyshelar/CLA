/*
 *
 * EditQuote reducer
 *
 */

import { fromJS } from 'immutable';

import {
DEFAULT_ACTION,
//   LOAD_DATA,
//   CLONE_LINE,
//   DELETE_LINE,
//   LOAD_DATA_ERROR,
//   LOAD_XRM_DATA,
//   LOAD_XRM_DATA_SUCCESS,
 } from './constants';

const initialState = fromJS({

});

function editQuoteReducer(state = initialState, action) {
  // let data = state.get('data');
  // switch (action.type) {
  //   case LOAD_DATA:
  //     return state
  //       .set('loading', true)
  //       .set('error', false)
  //       .setIn('data', false);
  //   case LOAD_DATA_SUCCESS:
  //     return state
  //       .set('data', action.data)
  //       .set('loading', false);
  //   case LOAD_DATA_ERROR:
  //     return state
  //       .set('error', action.error)
  //       .set('loading', false);
  //   case CLONE_LINE:
  //     data = state.get('data');
  //     return state.set('data', data.splice(0, data.products.length).concat(action.data.products));
  //   case DELETE_LINE:
  //     data = state.get('data');
  //     return state.set('data', data.splice(0, data.products.length).concat(action.data.products));
  //   case LOAD_XRM_DATA:
  //     return state
  //       .set('loading', true)
  //       .set('error', false)
  //       .setIn('xrmData', false);
  //   case LOAD_XRM_DATA_SUCCESS:
  //     return state
  //       .set('xrmData', action.xrmData)
  //       .set('loading', false);
  //   default:
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}


export default editQuoteReducer;
