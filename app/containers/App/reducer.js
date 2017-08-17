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
  UPDTATE_PROPS,
  CALCULATE_SELECTED,
  CLONE_GROUP,
  DELETE_GROUP,
  UNGROUP,
  GROUP,
  UPDATE,
  UPDATE_BUNDLE,
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
        cloneData.id = parseInt(Math.random() * 100000, 0);
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
      data = state.getIn(['data', 'lines']);
      return state.setIn(['data', 'lines'], fromJS(action.data));
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
    default:
      return state;
  }
}

export default appReducer;
