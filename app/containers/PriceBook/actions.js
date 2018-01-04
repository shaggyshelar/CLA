/*
 *
 * PriceBook actions
 *
 */

import {
  DEFAULT_ACTION,
  SAVE_ACTION,
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
