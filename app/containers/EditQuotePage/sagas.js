import { take, call, put, select, actionChannel } from 'redux-saga/effects';
import request from 'utils/request';
import _ from 'lodash';
import { SAVE_CUSTOM_SEGMENT_DATA } from './constants';
import { selectGlobal } from '../App/selectors';
import { dataLoadingError, dataLoaded } from '../App/actions';
import {
  SERVER_URL,
  EntityURLs,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
  SEGMENT,
} from '../App/constants';
export function* saveSegmentData(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveCustomSegments`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    if (quotes.quote.errorMessages && quotes.quote.errorMessages.length) {
      yield put(dataLoaded(quotes));
      yield put(dataLoadingError(quotes.quote.errorMessages));
    } else {
      yield put(dataLoaded(quotes));
    }
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}
export function* segmentCall() {
  while (true) {
    const chan = yield actionChannel(SEGMENT);
    const action = yield take(chan);
    const data = yield select(selectGlobal);
    const postLines = Object.assign({}, data.toJS().data);
    const lines = postLines.lines;
    const line = _.filter(lines, { id: action.id });
    line[0].isSegmented = action.value;
    try {
      const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SegmentDeSegmentQuoteline`}`;
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
    } finally {
      chan.close();
    }
  }
}
export function* saveCustomSegmentData() {
  while (true) {
    const chan = yield actionChannel(SAVE_CUSTOM_SEGMENT_DATA);
    const { segment } = yield take(chan);
    yield call(saveSegmentData, segment);
  }
}
export function* calculateQuotes() {
  while (true) {
    const chan = yield actionChannel(CALCULATE_SELECTED);
    const { data } = yield take(chan);
    yield call(calculateQuoteTotals, data);
    chan.close();
  }
}
export function* calculateQuoteTotals(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/Calculate`}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    if (quotes.quote.errorMessages && quotes.quote.errorMessages.length) {
      yield put(dataLoaded(quotes));
      yield put(dataLoadingError(quotes.quote.errorMessages));
    } else {
      yield put(dataLoaded(quotes));
    }
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* saveQuoteLines() {
  while (true) {
    const chan = yield actionChannel(QUICK_SAVE_QUOTES);
    yield take(chan);
    const lines = yield select(selectGlobal);
    const postLines = Object.assign({}, lines.toJS().data);
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
    } finally {
      chan.close();
    }
  }
}
export function* saveQuoteDetails(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveQuote`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const repos = yield call(request, requestURL, options);
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}
// All sagas to be loaded
export default [
  saveCustomSegmentData,
  calculateQuotes,
  saveQuoteLines,
  segmentCall,
];
