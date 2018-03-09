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
import React from 'react';
import { toast } from 'react-toastify';
// The initial state of the App
import {
  generateGuid,
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
  SAVE_APP_CUSTOM_SEGMENT_DATA,
  QUICK_SAVE_QUOTES,
  CANCEL,
  CONTINUE,
  SAVECONFIGURATION_SUCCESS,
  TOGGLE_RECONFIGURELINE_STATUS,
  TOGGLE_SUGGESTION_STATUS,
  SAVESUGGESTION_SUCCESS,
  CHANGE_DISCOUNT,
} from './constants';
const initialState = fromJS({
  loading: false,
  error: false,
  errorMessage: '',
  showPrice: false,
  data: {},
  dataChanged: false,
});

function appReducer(state = initialState, action) {
  let data = state.get('data');
  switch (action.type) {
    case SAVE_ACTION:
      return state.setIn(['data', 'priceList'], fromJS(action.data));
    case LOAD_DATA:
      toast.dismiss();
      return state.set('loading', true)
        .set('error', false);
    case LOAD_DATA_SUCCESS:
      // toast.dismiss();
      return state
        .set('data', fromJS(action.data.quote))
        .set('dataChanged', false)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      {
        toast.dismiss();
        let error = false;
        let errorMsg = false;
        if (action.error instanceof Array) {
          action.error.map((i) => {
            if (i.type === 'alert') {
              error = true;
              errorMsg = i.message;
            } else {
              toast.error(i.message === '' ? 'Something Went Wrong' : <p>{i.message}</p>, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: false,
              });
            }
            return this;
          });
        } else {
          toast.error(action.error.message === '' ? 'Something Went Wrong' : <p>{action.error.message}</p>, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false,
          });
        }
        return state.set('loading', false).set('error', error).set('errorMessage', errorMsg);
      }
    case CLONE_LINE:
      {
        data = state.getIn(['data', 'lines']).toJS();

        const index = _.findIndex(data, { id: action.data });
        const cloneData = Object.assign({}, data[index]);
        cloneData.id = generateGuid();
        data.splice(index, 0, cloneData);
        return state.setIn(['data', 'lines'], fromJS(data)).set('dataChanged', true);
      }
    case ADD_PRODUCTS:
      return state.set('loading', true);
    case QUICK_SAVE_QUOTES:
      return state.set('loading', true);
    case CANCEL:
      return state.set('error', false);
    case CONTINUE:
      return state.set('loading', true).set('error', false);
    case CALCULATE_SELECTED:
      return state.set('loading', true);
    case DELETE_LINE:
      // data = state.getIn(['data', 'lines']).toJS();
      // _.remove(data, (n) => n.id === action.data);
      // _.remove(data, (n) => n.parentLineId === action.data);
      return state.set('loading', true);

    case DELETE_MULTIPLE_LINES:
      // data = state.getIn(['data', 'lines']).toJS();
      // action.data.forEach((item) => {
      //   _.filter(data, { id: item }).map((j) => { j.isDeleted = true; });
      //   _.filter(data, { parentLineId: item }).map((j) => { j.isDeleted = true; });
      // }, this);
      return state.set('loading', true);
    case CLONE_MULTIPLE_LINES:
      {
        data = state.getIn(['data', 'lines']).toJS();

        action.data.forEach((item) => {
          const bundleProducts = _.filter(data, { parentLineId: item });
          const index = _.findIndex(data, { id: item });
          const cloneData = Object.assign({}, data[index]);
          cloneData.id = generateGuid();
          data.splice(index, 0, cloneData);
          for (let i = 0; i < bundleProducts.length; i += 1) {
            const cloneBundleLine = Object.assign({}, bundleProducts[i]);
            cloneBundleLine.id = generateGuid();
            data.splice(index + i + 1, 0, cloneBundleLine);
          }
        }, this);
        return state.setIn(['data', 'lines'], fromJS(data)).set('dataChanged', true);
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
      return state.setIn(['data', 'lines'], fromJS(action.data)).set('dataChanged', true);
    case CLONE_GROUP:
      return state
        .setIn(['data', 'lines'], fromJS(action.lines))
        .setIn(['data', 'groups'], fromJS(action.groups));
    case DELETE_GROUP:
      return state
        .setIn(['data', 'lines'], fromJS(action.lines))
        .setIn(['data', 'groups'], fromJS(action.groups)).set('dataChanged', true);
    case UNGROUP:
      toast.dismiss();
      return state
       // .set('data', fromJS(action.data))
        .set('error', false)
        .set('loading', true);
    case GROUP:
      return state
        .setIn(['data'], fromJS(action.data));
    case UPDATE_GROUP_DATA:
      {
        const groups = state.getIn(['data', 'groups']).toJS();
        const group = _.filter(groups, { id: action.id });
        group[0][action.field] = action.data;
        return state.setIn(['data', 'groups'], fromJS(groups)).set('dataChanged', true);
      }
    case UPDATE_GROUP_VAL:
      {
        const groups = state.getIn(['data', 'groups']).toJS();
        const group = _.filter(groups, { id: action.id });
        group[0][action.field] = action.data;
        return state.setIn(['data', 'groups'], fromJS(groups)).set('dataChanged', true);
      }
    case UPDATE:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        if (action.field === 'partnerDiscount' || action.field === 'distributorDiscount') {
          line[0][action.field] = action.data;
        } else {
          line[0][action.field].value = action.data;
        }
        return state.setIn(['data', 'lines'], fromJS(lines))
                    .set('dataChanged', true);
      }
    case UPDATE_BUNDLE:
      {
        const linesBundle = state.getIn(['data', 'lines']).toJS();
        const lineBundle = _.filter(linesBundle, { id: action.parentLineId });
        const bundleLine = _.filter(lineBundle[0].bundleProducts, { id: action.id });
        bundleLine[0][action.field].value = action.data;
        return state.setIn(['data', 'lines'], fromJS(linesBundle)).set('dataChanged', true);
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
        return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case UPDATE_SELECT_BUNDLE:
      {
        const linesBundle = state.getIn(['data', 'lines']).toJS();
        const lineBundle = _.filter(linesBundle, { id: action.parentLineId });
        const bundleLine = _.filter(lineBundle[0].bundleProducts, { id: action.id });
        _.map(bundleLine[0][action.field].selectValues, (i, index) => {
          if (i.id === action.data && !i.isSelected) {
            bundleLine[0][action.field].selectValues[index].isSelected = true;
          }
          if (i.id !== action.data && i.isSelected) {
            bundleLine[0][action.field].selectValues[index].isSelected = false;
          }
        });
        return state.setIn(['data', 'lines'], fromJS(linesBundle)).set('dataChanged', true);
      }
    case UPDATE_SEG:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        const segLine = _.filter(line[0].segmentData.columns, { columnName: action.name });
        if (action.field === 'additionalDiscount') {
          segLine[0][action.field].value = action.data;
        } else {
          segLine[0][action.field] = action.data;
        }
        return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case UPDATE_SEG_BUNDLE:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.parentLineId });
        const lineBundle = _.filter(line[0].bundleProducts, { id: action.id });
        const segLine = _.filter(lineBundle[0].segmentData.columns, { columnName: action.name });
        segLine[0][action.field] = action.data;
        return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case UPDATE_SEG_SELECT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.id });
        const segLine = _.filter(line[0].segmentData.columns, { columnName: action.name });
        _.map(segLine[0][action.field].selectValues, (i, index) => {
          if (i.id === action.data && !i.isSelected) {
            segLine[0][action.field].selectValues[index].isSelected = true;
          }
          if (i.id !== action.data && i.isSelected) {
            segLine[0][action.field].selectValues[index].isSelected = false;
          }
        });
        return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case UPDATE_SEG_BUNDLE_SELECT:
      {
        const lines = state.getIn(['data', 'lines']).toJS();
        const line = _.filter(lines, { id: action.parentLineId });
        const lineBundle = _.filter(line[0].bundleProducts, { id: action.id });
        const segLine = _.filter(lineBundle[0].segmentData.columns, { columnName: action.name });
        segLine[0][action.field] = action.data;
        return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case SEGMENT:
      {
        // const lines = state.getIn(['data', 'lines']).toJS();
        // const line = _.filter(lines, { id: action.id });
        // line[0].isSegmented = action.value;
        return state.set('loading', true);
        // return state.setIn(['data', 'lines'], fromJS(lines)).set('dataChanged', true);
      }
    case SAVE_APP_CUSTOM_SEGMENT_DATA : {
      return state.set('loading', true).set('dataChanged', true)
        .set('error', false);
    }
    case SAVECONFIGURATION_SUCCESS: {
      return state
        .set('data', fromJS(action.data.quote))
        .set('loading', false);
    }
    case TOGGLE_RECONFIGURELINE_STATUS : {
      const quote = state.get('data').toJS();
      const line = _.find(quote.lines, { id: action.reconfigureObj.id });
      if (line) {
        line.reconfigured = action.reconfigureObj.reconfigured;
        _.forEach(quote.lines, (line) => {
          line.toReconfigure = false;
        });
        line.toReconfigure = true;
      }
      const updateQuote = fromJS(quote);
      return state
         .set('data', updateQuote);
    }
    case TOGGLE_SUGGESTION_STATUS : {
      const quote = state.get('data').toJS();
      const line = _.find(quote.lines, { id: action.suggestionObj.id });
      if (line) {
        line.suggested = action.suggestionObj.suggested;
      }
      return state
         .set('data', fromJS(quote));
    }

    case SAVESUGGESTION_SUCCESS: {
      return state
        .set('data', fromJS(action.data.quote))
        .set('loading', false);
    }

    case CHANGE_DISCOUNT: {
      return state
        .set('data', fromJS(action.quoteData));
    }
    default:
      return state;
  }
}

export default appReducer;
