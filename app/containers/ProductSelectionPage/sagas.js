import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_COUNTRIES_DATA } from './constants';
import { countriesDataLoaded, dataLoadingError } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

// Individual exports for testing
export function* getCountriesSaga() {
  // See example in containers/HomePage/sagas.js
  try {
    const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}/${EntityURLs.COUNTRIES}`;
    // const requestURL = 'http://localhost:3000/api/product/countries';
    const repos = yield call(request, requestURL);
    yield put(countriesDataLoaded(repos));
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* countryData() {
  const watcher = yield takeLatest(LOAD_COUNTRIES_DATA, getCountriesSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[countryData];
