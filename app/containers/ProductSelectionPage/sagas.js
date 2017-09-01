import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PRODUCTS_DATA, LOAD_SEARCH_DATA } from './constants';
import { productsDataLoaded, dataLoadingError, searchedDataLoaded, searchBtnDataLoaded } from './actions';
// import { LOAD_REPOS } from 'containers/App/constants';
import { SERVER_URL, EntityURLs } from '../App/constants';
// Individual exports for testing
export function* getProductsSaga(action) {
  // See example in containers/HomePage/sagas.js
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?GroupId=${action.groupId}&PriceListId=${action.priceBookId}`}`;
    const repos = yield call(request, requestURL);
    yield put(productsDataLoaded(repos));
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* productsData() {
  const watcher = yield takeLatest(LOAD_PRODUCTS_DATA, getProductsSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* searchedProducts(action) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?GroupId=${action.searchObj.groupId}&PriceListId=${action.searchObj.priceBookId}&searchValue=${action.searchObj.searchValue}`}`;
    const repos = yield call(request, requestURL);
    if (!action.searchObj.fromSearch) {
      yield put(searchedDataLoaded(repos));
    } else {
      yield put(searchBtnDataLoaded(repos));
    }
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* searchedData() {
  const watcher = yield takeLatest(LOAD_SEARCH_DATA, searchedProducts);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[
  productsData,
  searchedData,
];
