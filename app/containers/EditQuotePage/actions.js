/*
 *
 * EditQuote actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DATA,
  CLONE_LINE,
  DELETE_LINE,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function loadData() {
  return {
    type: LOAD_DATA,
  };
}
export function cloneLine(data) {
  return {
    type: CLONE_LINE,
    data:data
  };
}
export function deleteLine(data) {
  return {
    type: DELETE_LINE,
    data:data
  };
}
export function dataLoaded(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data:data,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

