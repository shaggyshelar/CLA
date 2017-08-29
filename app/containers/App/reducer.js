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
import _ from 'lodash';
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
  DELETE_MULTIPLE_LINES,
  CLONE_MULTIPLE_LINES,
  UPDTATE_PROPS,
  CALCULATE_SELECTED,
  CLONE_GROUP,
  DELETE_GROUP,
  UNGROUP,
  GROUP,
  UPDATE,
  UPDATE_BUNDLE,
  UPDATE_SELECT,
  UPDATE_SELECT_BUNDLE,
  UPDATE_SEG,
  UPDATE_SEG_BUNDLE,
  UPDATE_SEG_SELECT,
  UPDATE_SEG_BUNDLE_SELECT,
  UPDATE_GROUP_DATA,
  UPDATE_GROUP_VAL,
  SEGMENT,
} from './constants';
const initialState = fromJS({
  loading: false,
  error: false,
  showPrice: false,
  data: {},
});

function appReducer(state = initialState, action) {
  let data = state.get('data');
  switch (action.type) {
    case SAVE_ACTION:
      return state.setIn(['data', 'priceList'], fromJS(action.data));
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('data', fromJS(action.data.quote))
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CLONE_LINE:
      {
        data = state.getIn(['data', 'lines']).toJS();
        const index = _.findIndex(data, { id: action.data });
        const cloneData = Object.assign({}, data[index]);
        cloneData.id = parseInt(Math.random() * 100000, 0).toString();
        data.splice(index, 0, cloneData);
        return state.setIn(['data', 'lines'], fromJS(data));
      }
    case ADD_PRODUCTS:
      data = state.getIn(['data', 'lines']);
      return state.setIn(['data', 'lines'], fromJS(data.concat(action.data)));
    case DELETE_LINE:
      data = state.getIn(['data', 'lines']).toJS();
      _.remove(data, (n) => n.id === action.data);
      return state.setIn(['data', 'lines'], fromJS(data));

    case DELETE_MULTIPLE_LINES:
      data = state.getIn(['data', 'lines']).toJS();
      action.data.forEach((item) => {
        _.remove(data, { id: item });
      }, this);
      return state.setIn(['data', 'lines'], fromJS(data));
    case CLONE_MULTIPLE_LINES:
      {
        data = state.getIn(['data', 'lines']).toJS();
        action.data.forEach((item) => {
          const index = _.findIndex(data, { id: item });
          const cloneData = Object.assign({}, data[index]);
          cloneData.id = parseInt(Math.random() * 100000, 0).toString();
          data.splice(index, 0, cloneData);
        }, this);
        return state.setIn(['data', 'lines'], fromJS(data));
      }
    case LOAD_XRM_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('xrmData', false);
    case LOAD_XRM_DATA_SUCCESS:
      return state
        .set('xrmData', action.xrmData)
        .set('loading', false);
    case UPDTATE_PROPS:
      return state.setIn(['data', 'lines'], fromJS(action.data));
    case CALCULATE_SELECTED:
      return state
          .setIn(['data'], fromJS(action.data));
    case CLONE_GROUP:
      return state
        .setIn(['data', 'lines'], fromJS(action.lines))
        .setIn(['data', 'groups'], fromJS(action.groups));
    case DELETE_GROUP:
      return state
        .setIn(['data', 'lines'], fromJS(action.lines))
        .setIn(['data', 'groups'], fromJS(action.groups));
    case UNGROUP:
      return state
        .setIn(['data'], fromJS(action.data));
    case GROUP:
      return state
        .setIn(['data'], fromJS(action.data));
    case UPDATE_GROUP_DATA:
      {
        const groups = state.getIn(['data', 'groups']).toJS();
        const group = _.filter(groups, { id: action.id });
        group[0][action.field] = action.data;
        return state.setIn(['data', 'groups'], fromJS(groups));
      }
    case UPDATE_GROUP_VAL:
      {
        const groups = state.getIn(['data', 'groups']).toJS();
        const group = _.filter(groups, { id: action.id });
        group[0][action.field] = action.data;
        return state.setIn(['data', 'groups'], fromJS(groups));
      }
    case UPDATE:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        line[0][action.field].value = action.data;
        return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case UPDATE_BUNDLE:
      {
        const linesBundle = state.getIn(['data', 'lines']).toJS();
        const lineBundle = _.filter(linesBundle, { id: action.parentId });
        const bundleLine = _.filter(lineBundle[0].bundleProducts, { id: action.id });
        bundleLine[0][action.field].value = action.data;
        return state.setIn(['data', 'lines'], fromJS(linesBundle));
      }
    case UPDATE_SELECT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        _.map(line[0][action.field].selectValues, (i, index) => {
          if (i.id === action.data && !i.isSelected) {
            line[0][action.field].selectValues[index].isSelected = true;
          }
          if (i.id !== action.data && i.isSelected) {
            line[0][action.field].selectValues[index].isSelected = false;
          }
        });
        return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case UPDATE_SELECT_BUNDLE:
      {
        const linesBundle = state.getIn(['data', 'lines']).toJS();
        const lineBundle = _.filter(linesBundle, { id: action.parentId });
        const bundleLine = _.filter(lineBundle[0].bundleProducts, { id: action.id });
        _.map(bundleLine[0][action.field].selectValues, (i, index) => {
          if (i.id === action.data && !i.isSelected) {
            bundleLine[0][action.field].selectValues[index].isSelected = true;
          }
          if (i.id !== action.data && i.isSelected) {
            bundleLine[0][action.field].selectValues[index].isSelected = false;
          }
        });
        return state.setIn(['data', 'lines'], fromJS(linesBundle));
      }
    case UPDATE_SEG:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        const segLine = _.filter(line[0].segmentData.columns, { name: action.name });
        segLine[0][action.field] = action.data;
        return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case UPDATE_SEG_BUNDLE:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.parentId });
        const lineBundle = _.filter(line[0].bundleProducts, { id: action.id });
        const segLine = _.filter(lineBundle[0].segmentData.columns, { name: action.name });
        segLine[0][action.field] = action.data;
        return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case UPDATE_SEG_SELECT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        const segLine = _.filter(line[0].segmentData.columns, { name: action.name });
        segLine[0][action.field] = action.data;
        // return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case UPDATE_SEG_BUNDLE_SELECT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.parentId });
        const lineBundle = _.filter(line[0].bundleProducts, { id: action.id });
        const segLine = _.filter(lineBundle[0].segmentData.columns, { name: action.name });
        segLine[0][action.field] = action.data;
        // return state.setIn(['data', 'lines'], fromJS(lines));
      }
    case SEGMENT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        if (action.isOption) {
          const bundleLine = _.filter(lines, { id: action.parent })[0];
          const line = _.filter(bundleLine.bundleProducts, { id: action.id })[0];
          line.isSegmented = action.value;
        } else {
          const line = _.filter(lines, { id: action.id });
          line[0].isSegmented = action.value;
        }
        return state.setIn(['data', 'lines'], fromJS(lines));
      }
    default:
      return state;
  }
}

export default appReducer;
