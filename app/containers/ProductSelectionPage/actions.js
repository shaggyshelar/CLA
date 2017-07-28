/*
 *
 * ProductSelectionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOW_FILTER
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showFilter(value) {
  debugger
  return {
    type: SHOW_FILTER,
    data:value.data
  };
}