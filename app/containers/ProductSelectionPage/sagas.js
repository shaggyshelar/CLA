import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, select, put, cancel, takeLatest, takeEvery, fork, actionChannel } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PRODUCTS_DATA, LOAD_SEARCH_DATA } from './constants';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { selectGlobal } from '../App/selectors';
import {
  SERVER_URL,
  EntityURLs,
  ADD_PRODUCTS,
} from '../App/constants';
import { productsDataLoaded, searchedDataLoaded, searchBtnDataLoaded } from './actions';
// import { LOAD_REPOS } from 'containers/App/constants';
// import { SERVER_URL, EntityURLs } from '../App/constants';
// Individual exports for testing
export function* getProductsSaga(action) {
  // See example in containers/HomePage/sagas.js
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?GroupId=${action.groupId}&PriceListId=C0FE4869-0F78-E711-811F-C4346BDC0E01`}`;
    const repos = yield call(request, requestURL);
    if (repos.products.errorMessages && repos.quote.errorMessages.length) {
      yield put(dataLoadingError(repos.quote.errorMessages));
    } else {
      yield put(productsDataLoaded(repos));
    }
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* productsData() {
  while (true) {
    const watcher = yield takeLatest(LOAD_PRODUCTS_DATA, getProductsSaga);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  }
}

export function* searchedProducts(action) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?PriceListId=${action.searchObj.priceBookId}&SearchValue=${action.searchObj.searchValue}`}`;
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
export function* addProducts() {
  while (true) {
    const chan = yield actionChannel(ADD_PRODUCTS);
    const lines = yield select(selectGlobal);
    const postLines = Object.assign({}, lines.toJS().data);
    const { data } = yield take(chan);
    try {
      const dataPost = postLines;
      dataPost.lines = dataPost.lines.concat(data);
      const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/AddProducts`}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost),
      };
      const repos = yield call(request, requestURL, options);
      if (repos.quote.errorMessages && repos.quote.errorMessages.length) {
        yield put(dataLoadingError(repos.quote.errorMessages));
      } else {
        yield put(dataLoaded(repos));
      }
    } catch (err) {
      yield put(dataLoadingError(err));
    }
  }
}

export function* addProductsPost(data, action) {
  try {
    const dataPost = data;
    dataPost.lines = dataPost.lines.concat(action.data);
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/AddProducts`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPost),
    };
    const repos = yield call(request, requestURL, options);
    yield put(dataLoadingError(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

// All sagas to be loaded
export default[
  productsData,
  searchedData,
  addProducts,
];
