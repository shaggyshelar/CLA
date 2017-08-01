/*
 *
 * ProductSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_COUNTRIES_DATA,
  LOAD_COUNTRIES_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  countries: {},
});

function productSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_FILTER:
      return state
        .set('showFilter', action.data);
    case LOAD_COUNTRIES_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('countries', false);
    case LOAD_COUNTRIES_DATA_SUCCESS:
      return state
        .set('countries', action.countries)
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
