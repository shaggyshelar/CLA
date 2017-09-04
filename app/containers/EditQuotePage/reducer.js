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
  TOGGLE_CHECKALL,
 } from './constants';

const initialState = fromJS({
  customSegments: [],
  updatedSegments: [],
  isCheckAll: false,
});

function editQuoteReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      if (action && customSegments) {
        action.customSegments.forEach((item) => {
          const rec = item;
          rec.id = (Math.random() * 100000).toString();
          rec.isSelected = false;
          customSegments.push(rec);
        }, this);
      }
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
      let isCheckAll = state.get('isCheckAll');
      const updatedSegments = _.filter(customSegments, { isSelected: false });
      if (updatedSegments.length === 1) {
        isCheckAll = false;
      }
      return state
        .set('customSegments', fromJS(updatedSegments))
        .set('isCheckAll', isCheckAll);
    }
    case CHECK_CUSTOM_SEGMENT_DATA: {
      const customSegments = state.get('customSegments').toJS();
      const selectedSegment = _.find(customSegments, { id: action.id });
      if (selectedSegment) {
        selectedSegment.isSelected = !selectedSegment.isSelected;
      }
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
      if (selectedSegment) {
        selectedSegment[action.item.field] = action.item.value;
      }
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
    case TOGGLE_CHECKALL : {
      return state
        .set('isCheckAll', action.isCheckAll);
    }
    default:
      return state;
  }
}


export default editQuoteReducer;
