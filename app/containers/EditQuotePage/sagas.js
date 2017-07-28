import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_DATA, LOAD_XRM_DATA } from './constants';
import { dataLoaded, dataLoadingError, xrmDataLoaded } from './actions';


export function* getData() {
  // Select username from store
  const requestURL = 'http://localhost:3000/api/quote';

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* getXrmData() {
  // Select username from store
  const requestURL = 'https://esplsol.crm8.dynamics.com/api/data/v8.0/products?$select=name,productnum' +
      'ber,standardcost,description,p2qes_quantityeditable';

  try {
    const headers = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'OData-MaxVersion': '4.0',
        'Prefer': 'odata.include-annotations="*"',
        'OData-Version': '4.0',
      },
    };

    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL, headers);
    console.log(repos);
    yield put(xrmDataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}


// Individual exports for testing
export function* dataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_DATA, getData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* xrmDataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_XRM_DATA, getXrmData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  dataSaga,
  xrmDataSaga,
];
