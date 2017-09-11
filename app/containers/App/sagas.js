import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError } from '../App/actions';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
} from '../App/constants';

export function* getData(action) {
  const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/EditQuote?QuoteId=${action.quoteId}`}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    const repos = yield call(request, requestURL, options);
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}
export function* dataSaga() {
  const watcher = yield takeLatest(LOAD_DATA, getData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default[
  dataSaga,
];
