/*
 *
 * ProductSelectionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_COUNTRIES_DATA,
  LOAD_COUNTRIES_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showFilter(value) {
  return {
    type: SHOW_FILTER,
    data: value,
  };
}

export function loadCountriesData() {
  return {
    type: LOAD_COUNTRIES_DATA,
  };
}

export function countriesDataLoaded(countries) {
  return {
    type: LOAD_COUNTRIES_DATA_SUCCESS,
    countries,
  };
}

export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
