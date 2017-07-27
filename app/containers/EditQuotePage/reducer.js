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
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  data:[]
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
      var data  = state.get('data')
      return state.set('data', data.splice(0,data.length).concat(action.data))
    case DELETE_LINE:
      var data  = state.get('data')
      return state.set('data', data.splice(0,data.length).concat(action.data))
    default:
      return state;
  }
}

export default editQuoteReducer;
