/*
 *
 * EditQuote reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  LOAD_CUSTOM_SEGMENT_DATA,
  ADD_CUSTOM_SEGMENT_DATA,
  DELETE_CUSTOM_SEGMENT_DATA,
  CHANGE_CUSTOM_SEGMENT_FIELD_DATA,
  CHECK_ALL_CUSTOM_SEGMENT_DATA,
  CHECK_CUSTOM_SEGMENT_DATA,
  CLEAR_CUSTOM_SEGMENT_DATA,
  SAVE_CUSTOM_SEGMENT_DATA,
 } from './constants';

const initialState = fromJS({
  customSegments: [],
  updatedSegments: [],
});

function editQuoteReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      if (action && customSegments) {
        action.customSegments.forEach((item) => {
          const rec = item;
          rec.id = (Math.random() * 100000).toString();
          // rec.startDate = item.startDate;
          // rec.endDate = item.endDate;
          rec.startDate = '2017-08-23T06:30:00.000Z';
          rec.endDate = '2017-08-24T06:30:00.000Z';
          rec.isSelected = false;
          customSegments.push(rec);
        }, this);
      }
      console.log('customSegments', customSegments);
      return state
        .set('customSegments', fromJS(customSegments));
    }
    case ADD_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const customSegement = {
        id: (Math.random() * 100000).toString(),
        name: '',
        startDate: '',
        endDate: '',
        isSelected: false,
        isDefault: false,
      };
      customSegments.push(customSegement);
      return state
        .set('customSegments', fromJS(customSegments));
    }
    case DELETE_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const updatedSegments = _.filter(customSegments, { isSelected: false });
      return state
        .set('customSegments', fromJS(updatedSegments));
    }
    case CHECK_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const selectedSegment = _.find(customSegments, { id: action.id });
      selectedSegment.isSelected = !selectedSegment.isSelected;
      return state
        .set('customSegments', fromJS(customSegments));
    }
    case CHECK_ALL_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const updatedSegments = [];
      customSegments.forEach((item) => {
        const data = Object.assign({}, item);
        if (!data.isDefault) {
          data.isSelected = action.isCheckAll;
        }
        updatedSegments.push(data);
      }, this);
      return state
        .set('customSegments', fromJS(updatedSegments));
    }
    case CHANGE_CUSTOM_SEGMENT_FIELD_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const selectedSegment = _.find(customSegments, { id: action.item.id });
      selectedSegment[action.item.field] = action.item.value;
      return state
        .set('customSegments', fromJS(customSegments));
    }
    case CLEAR_CUSTOM_SEGMENT_DATA: {
      const updatedSegments = state.get('updatedSegments').toJS();
      return state
        .set('customSegments', fromJS(updatedSegments));
    }
    case SAVE_CUSTOM_SEGMENT_DATA : {
      const updatedSegments = state.get('updatedSegments').toJS();
      return state
        .set('customSegments', fromJS(updatedSegments));
    }
    default:
      return state;
  }
}


export default editQuoteReducer;
