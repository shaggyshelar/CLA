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

