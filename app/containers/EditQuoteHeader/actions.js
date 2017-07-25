/*
 *
 * EditQuoteHeader actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
} from '../App/constants';

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

export function dataLoaded(DATA, username) {
  return {
    type: LOAD_DATA_SUCCESS,
    DATA,
    username,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
