import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_PRODUCTS_DATA } from './constants';
import { loadProductsDataSuccess, dataLoadingError } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

export function* getProductsSaga(action) {
  const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/AddOptions/${action.featureId}`}`;
  try {
    const repos = yield call(request, requestURL);
    yield put(loadProductsDataSuccess(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* loadProductsData() {
  const watcher = yield takeLatest(LOAD_PRODUCTS_DATA, getProductsSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[loadProductsData];
