import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_CONFIGURE_PRODUCTS_DATA, SAVE_CONFIGURE_PRODUCTS_DATA } from './constants';
import { loadReConfigureProductsDataSuccess, dataLoadingError, configuredProductsSaveSuccess } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

export function* getProductBundleSaga(action) {
  const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/ReconfigureProduct?ProductId=${action.data.id}&PriceListId=${action.data.priceBookId}&QuoteId=${action.data.quoteId}`}`;
  try {
    const repos = yield call(request, requestURL);
    yield put(loadReConfigureProductsDataSuccess(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* saveProducts(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveConfigurations`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const products = yield call(request, requestURL, options);
    yield put(configuredProductsSaveSuccess(products));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* saveConfiguredProducts() {
  const { data } = yield take(SAVE_CONFIGURE_PRODUCTS_DATA);
  yield call(saveProducts, data);
  yield take(LOCATION_CHANGE);
}

export function* loadProductBundleData() {
  const watcher = yield takeLatest(LOAD_CONFIGURE_PRODUCTS_DATA, getProductBundleSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  loadProductBundleData,
  saveConfiguredProducts,
];
