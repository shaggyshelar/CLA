/*
 *
 * ProductSelectionHeader reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
} from './constants';

const initialState = fromJS({
  showFilter: false,
});

function productSelectionHeaderReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_FILTER:
      return state
        .set('showFilter', action.showFIlter);
    default:
      return state;
  }
}

export default productSelectionHeaderReducer;
