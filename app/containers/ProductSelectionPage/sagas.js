import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_PRODUCTS_DATA } from './constants';
import { productsDataLoaded, dataLoadingError } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

// Individual exports for testing
export function* getProductsSaga() {
  // See example in containers/HomePage/sagas.js
  try {
    //const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}`;
    const requestURL = 'http://192.168.101.162:3000/api/products';
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

// All sagas to be loaded
export default[productsData];
