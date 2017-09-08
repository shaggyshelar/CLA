import request from 'utils/request';
import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { selectGlobal } from './selectors';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
  // DELETE_MULTIPLE_LINES,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
  ADD_PRODUCTS,
} from '../App/constants';

export function* getData(action) {
  const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/EditQuote?QuoteId=${action.quoteId}`}`;
  // const requestURL = 'http://192.168.101.162:3000/api/products';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    // Call our request helper (see 'utils/request') let repos = yield call(request,
    // 'https://14.141.105.180:1823/api/values/GetUserName/1?callback=ab');
    const repos = yield call(request, requestURL, options);
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* saveQuoteDetails(data) {
  try {
    const requestURL = 'http://localhost:3000/v1/quote/save/1';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const repos = yield call(request, requestURL, options);
    // yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* calculateQuoteTotals(data) {
  try {
    const requestURL = 'http://localhost:3000/v1/quote/calculate/1';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    yield put(dataLoaded(JSON.parse(quotes)));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* CalculateQuotes() {
  const { data } = yield take(CALCULATE_SELECTED);
  yield call(calculateQuoteTotals, data);

  yield take(LOCATION_CHANGE);
}

export function* SaveQuotes() {
  const { data } = yield take(QUICK_SAVE_QUOTES);
  yield call(saveQuoteDetails, data);

  yield take(LOCATION_CHANGE);
}

// Individual exports for testing
export function* dataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_DATA, getData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* addProducts() {
  const { data } = yield take(ADD_PRODUCTS);
  const lines = yield select(selectGlobal);
  const postLines = Object.assign({}, lines.toJS().data);
  postLines.lines = postLines.lines.concat(data);
  yield call(addProductsPost, postLines);
  yield take(LOCATION_CHANGE);
}

export function* addProductsPost(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/AddProducts`}`;
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
export default[dataSaga,
  addProducts,
  SaveQuotes,
  CalculateQuotes];
