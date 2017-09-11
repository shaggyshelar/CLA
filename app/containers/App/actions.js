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
  CLONE_MULTIPLE_LINES,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
  UPDTATE_PROPS,
  CLONE_GROUP,
  DELETE_GROUP,
  UNGROUP,
  GROUP,
  UPDATE,
  UPDATE_BUNDLE,
  UPDATE_SEG,
  UPDATE_SEG_SELECT,
  UPDATE_SEG_BUNDLE_SELECT,
  UPDATE_SEG_BUNDLE,
  UPDATE_GROUP_DATA,
  UPDATE_GROUP_VAL,
  SEGMENT,
  UPDATE_SELECT,
  UPDATE_SELECT_BUNDLE,
  SAVE_CUSTOM_SEGMENT_DATA_SUCCESS,
  SAVE_APP_CUSTOM_SEGMENT_DATA,
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

export function loadData(quoteId) {
  return {
    type: LOAD_DATA,
    quoteId,
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

export function cloneMultipleLines(data) {
  return {
    type: CLONE_MULTIPLE_LINES,
    data,
  };
}

export function calculateSelectedData(data) {
  return {
    type: CALCULATE_SELECTED,
    data,
  };
}

export function quickSaveQuotes() {
  return {
    type: QUICK_SAVE_QUOTES,
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

export function update(id, data, field) {
  return {
    type: UPDATE,
    data,
    id,
    field,
  };
}
export function updateBundle(parentId, id, field, data) {
  return {
    type: UPDATE_BUNDLE,
    parentId,
    data,
    id,
    field,
  };
}

export function updateSelect(id, data, field) {
  return {
    type: UPDATE_SELECT,
    data,
    id,
    field,
  };
}

export function updateSelectBundle(parentId, id, field, data) {
  return {
    type: UPDATE_SELECT_BUNDLE,
    parentId,
    data,
    id,
    field,
  };
}

export function updateSeg(id, name, field, data) {
  return {
    type: UPDATE_SEG,
    data,
    id,
    field,
    name,
  };
}
export function updateSegBundle(parentId, id, name, field, data) {
  return {
    type: UPDATE_SEG_BUNDLE,
    parentId,
    data,
    id,
    field,
    name,
  };
}
export function updateSegSelect(id, name, field, data) {
  return {
    type: UPDATE_SEG_SELECT,
    data,
    id,
    field,
    name,
  };
}
export function updateSegBundleSelect(parentId, id, name, field, data) {
  return {
    type: UPDATE_SEG_BUNDLE_SELECT,
    parentId,
    data,
    id,
    field,
    name,
  };
}
export function updateGroupData(id, field, data) {
  return {
    type: UPDATE_GROUP_DATA,
    id,
    field,
    data,
  };
}

export function updateGroupValue(id, field, data) {
  return {
    type: UPDATE_GROUP_VAL,
    id,
    field,
    data,
  };
}
export function segment(id, value) {
  return {
    type: SEGMENT,
    id,
    value,
  };
}

export function saveCustomSegmentDataSuccess(data) {
  return {
    type: SAVE_CUSTOM_SEGMENT_DATA_SUCCESS,
    data,
  };
}

export function saveAppCustomSegmentData() {
  return {
    type: SAVE_APP_CUSTOM_SEGMENT_DATA,
  };
}
