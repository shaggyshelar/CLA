/*
 *
 * SuggestionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_SUGGESTIONS,
  LOAD_SUGGESTIONS_SUCCESS,
  LOAD_SUGGESTIONS_ERROR,
  TOGGLE_CHECKBOX_CHANGE,
  SAVE_SUGGESTIONS,
  UPDATE_PRODUCT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadSuggestions(data) {
  return {
    type: LOAD_SUGGESTIONS,
    data,
  };
}
export function loadSuggestionsSuccess(suggestionsData) {
  return {
    type: LOAD_SUGGESTIONS_SUCCESS,
    suggestionsData,
  };
}

export function loadSuggestionsError(error) {
  return {
    type: LOAD_SUGGESTIONS_ERROR,
    error,
  };
}

export function toggleCheckboxChange(item) {
  return {
    type: TOGGLE_CHECKBOX_CHANGE,
    item,
  };
}

export function saveSuggestions(data, locationQuery) {
  return {
    type: SAVE_SUGGESTIONS,
    data,
    locationQuery,
  };
}

export function updateProduct(productObj) {
  return {
    type: UPDATE_PRODUCT,
    productObj,
  };
}
