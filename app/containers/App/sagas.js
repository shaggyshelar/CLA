import request from 'utils/request';
import { take, call, put, cancel, takeLatest, actionChannel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { selectGlobal } from '../App/selectors';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
  CONTINUE,
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
    if (repos.quote.errorMessages && repos.quote.errorMessages.length) {
      yield put(dataLoadingError(repos.quote.errorMessages));
      yield put(dataLoaded(repos));
    } else {
      yield put(dataLoaded(repos));
    }
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}
export function* dataSaga() {
  const watcher = yield takeLatest(LOAD_DATA, getData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* continueSave() {
  while (true) {
    const chan = yield actionChannel(CONTINUE);
    yield take(chan);
    const lines = yield select(selectGlobal);
    const postLines = Object.assign({}, lines.toJS().data);
    postLines.forceSave = true;
    try {
      const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveQuote`}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postLines),
      };

      const repos = yield call(request, requestURL, options);
      if (repos.quote.errorMessages && repos.quote.errorMessages.length) {
        yield put(dataLoadingError(repos.quote.errorMessages));
        yield put(dataLoaded(repos));
      } else {
        yield put(dataLoaded(repos));
      }
    } catch (err) {
      yield put(dataLoadingError(err));
    }
  }
}

// All sagas to be loaded
export default[
  dataSaga,
  continueSave,
];
