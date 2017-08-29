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
  LOAD_CUSTOM_SEGMENT_DATA,
  ADD_CUSTOM_SEGMENT_DATA,
  DELETE_CUSTOM_SEGMENT_DATA,
  SAVE_CUSTOM_SEGMENT_DATA,
  CHANGE_CUSTOM_SEGMENT_FIELD_DATA,
  CHECK_ALL_CUSTOM_SEGMENT_DATA,
  CHECK_CUSTOM_SEGMENT_DATA,
 } from './constants';

const initialState = fromJS({
  customSegments: [],
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
    case LOAD_CUSTOM_SEGMENT_DATA: {
      const customSegments = [];
      action.customSegments.forEach((item) => {
        const rec = item;
        rec.id = (Math.random() * 100000);
        rec.isSelected = false;
        customSegments.push(rec);
      }, this);

      return state
        .set('customSegments', customSegments);
    }
    case ADD_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments');
      const customSegement = {
        id: (Math.random() * 100000),
        name: '',
        startDate: '',
        endDate: '',
        isSelected: false,
      };
      customSegments.push(customSegement);
      return state
        .set('customSegments', customSegments);
    }
    default:
      return state;
  }
}


export default editQuoteReducer;
