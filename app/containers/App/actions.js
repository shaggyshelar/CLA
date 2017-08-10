/*
 *
 * PriceBook actions
 *
 */

import {
  DEFAULT_ACTION,
  SAVE_ACTION,
  LOAD_DATA,
  CLONE_LINE,
  DELETE_LINE,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  LOAD_XRM_DATA,
  LOAD_XRM_DATA_SUCCESS,
  ADD_PRODUCTS,
  DELETE_MULTIPLE_LINES,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
  UPDTATE_PROPS,
  CLONE_GROUP,
  DELETE_GROUP,
  UNGROUP,
  GROUP,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function saveAction(data) {
  return {
    type: SAVE_ACTION,
    data,
  };
}
export function loadXrmData() {
  return {
    type: LOAD_XRM_DATA,
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
    data,
  };
}

export function cloneGroup(lines, groups) {
  return {
    type: CLONE_GROUP,
    lines,
    groups,
  };
}

export function deleteGroup(lines, groups) {
  return {
    type: DELETE_GROUP,
    lines,
    groups,
  };
}

export function addProducts(data) {
  return {
    type: ADD_PRODUCTS,
    data,
  };
}

export function deleteLine(data) {
  return {
    type: DELETE_LINE,
    data,
  };
}

export function deleteMultipleLines(data) {
  return {
    type: DELETE_MULTIPLE_LINES,
    data,
  };
}

export function calculateSelectedData(data) {
  return {
    type: CALCULATE_SELECTED,
    data,
  };
}

export function quickSaveQuotes(data) {
  return {
    type: QUICK_SAVE_QUOTES,
    data,
  };
}

export function dataLoaded(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function xrmDataLoaded(data) {
  return {
    type: LOAD_XRM_DATA_SUCCESS,
    xrmData: data,
  };
}

export function ungroup(data) {
  return {
    type: UNGROUP,
    data,
  };
}

export function group(data) {
  return {
    type: GROUP,
    data,
  };
}

export function updateProps(data) {
  return {
    type: UPDTATE_PROPS,
    data,
  };
}
