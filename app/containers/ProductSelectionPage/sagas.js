import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, select, put, cancel, takeLatest, takeEvery, fork, actionChannel } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PRODUCTS_DATA, LOAD_SEARCH_DATA } from './constants';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { selectGlobal } from '../App/selectors';
import { toast } from 'react-toastify';
import {
  SERVER_URL,
  EntityURLs,
  ADD_PRODUCTS,
} from '../App/constants';
import { productsDataLoaded, searchedDataLoaded, searchBtnDataLoaded } from './actions';
// import { LOAD_REPOS } from 'containers/App/constants';
// import { SERVER_URL, EntityURLs } from '../App/constants';
// Individual exports for testing
export function* getProductsSaga(groupId, priceBookId, quoteId) {
  // See example in containers/HomePage/sagas.js
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?GroupId=${groupId}&PriceListId=${priceBookId}&QuoteId=${quoteId}`}`;
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
    const chan = yield actionChannel(LOAD_PRODUCTS_DATA);
    // Suspend execution until location changes
    const { groupId, priceBookId, quoteId } = yield take(chan);
    yield call(getProductsSaga, groupId, priceBookId, quoteId);
  }
}

export function* searchedProducts(searchObj) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/GetProducts?PriceListId=${searchObj.priceBookId}&QuoteId=${searchObj.quoteId}&SearchValue=${searchObj.searchValue}`}`;
    const repos = yield call(request, requestURL);
    if (!searchObj.fromSearch) {
      yield put(searchedDataLoaded(repos));
    } else {
      yield put(searchBtnDataLoaded(repos));
    }
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* searchedData() {
  while (true) {
    const chan = yield actionChannel(LOAD_SEARCH_DATA);
    const { searchObj } = yield take(chan);
    yield call(searchedProducts, searchObj);
  }
}
export function* addProducts() {
  while (true) {
    try {
      const chan = yield actionChannel(ADD_PRODUCTS);
      const { data } = yield take(chan);
      const lines = yield select(selectGlobal);
      const postLines = Object.assign({}, lines.toJS().data);
      postLines.lines = postLines.lines.length ? postLines.lines.concat(data) : data;
      const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/AddProducts`}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postLines),
      };
      const repos = yield call(request, requestURL, options);
      if (repos.quote.errorMessages && repos.quote.errorMessages.length) {
        toast.success(' Products Added with errors', {
          position: toast.POSITION.TOP_CENTER,
        });
        yield put(dataLoadingError(repos.quote.errorMessages));
        yield put(dataLoaded(repos));
      } else {
        toast.success(' Products Added', {
          position: toast.POSITION.TOP_CENTER,
        });
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
