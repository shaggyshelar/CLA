/*
 *
 * ProductSelectionHeader actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOW_FILTER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showFilter(value) {
  return {
    type: SHOW_FILTER,
    showFilter: value,
  };
}
