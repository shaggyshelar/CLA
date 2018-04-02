import request from 'utils/request';
import { take, call, put, actionChannel, select } from 'redux-saga/effects';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { selectGlobal } from '../App/selectors';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
  CONTINUE,
  UNGROUP,
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
  const chan = yield actionChannel(LOAD_DATA);
  while (true) {
    const action = yield take(chan);
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
}
export function* continueSave() {
  const chan = yield actionChannel(CONTINUE);
  while (true) {
    yield take(chan);
    const lines = yield select(selectGlobal);
    const postLines = Object.assign({}, lines.toJS().data);
    postLines.isContinue = true;
    postLines.isForceSave = true;
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

export function* ungroup(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/Calculate`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

export function* ungroupData() {
  while (true) {
    const chan = yield actionChannel(UNGROUP);
    const { data } = yield take(chan);
    yield call(ungroup, data);
  }
}

// All sagas to be loaded
export default[
  dataSaga,
  continueSave,
  ungroupData,
];
