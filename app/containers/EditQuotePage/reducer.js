/*
 *
 * EditQuote reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  CLONE_LINE,
  DELETE_LINE,
  LOAD_DATA_ERROR,
  LOAD_XRM_DATA,
  LOAD_XRM_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  data: [],
  xrmData: [],
});

function editQuoteReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('data', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('data', action.data)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CLONE_LINE:
      var data = state.get('data');
      return state.set('data', data.splice(0,data.length).concat(action.data))
    case DELETE_LINE:
      var data = state.get('data');
      return state.set('data', data.splice(0,data.length).concat(action.data))
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

export default editQuoteReducer;
