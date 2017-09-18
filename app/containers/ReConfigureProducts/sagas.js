import request from 'utils/request';
import { take, call, put, actionChannel } from 'redux-saga/effects';
import { LOAD_CONFIGURE_PRODUCTS_DATA, SAVE_CONFIGURE_PRODUCTS_DATA } from './constants';
import { loadReConfigureProductsDataSuccess, reconfigureDataLoadingError } from './actions';
import { dataLoaded, dataLoadingError } from '../App/actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

export function* getProductBundleSaga(data) {
  const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/ReconfigureProduct?ProductId=${data.productId}&PriceListId=${data.priceBookId}&QuoteId=${data.quoteId}&LineId=${data.quoteLineId}`}`;
  try {
    const repos = yield call(request, requestURL);
    yield put(loadReConfigureProductsDataSuccess(repos));
  } catch (err) {
    yield put(reconfigureDataLoadingError(err));
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

export function* saveConfiguredProducts() {
  while (true) {
    const chan = yield actionChannel(SAVE_CONFIGURE_PRODUCTS_DATA);
    const { data } = yield take(chan);
    yield call(saveProducts, data);
  }
}

export function* loadProductBundleData() {
  while (true) {
    const chan = yield actionChannel(LOAD_CONFIGURE_PRODUCTS_DATA);
    const { data } = yield take(chan);
    yield call(getProductBundleSaga, data);
  }
}

// All sagas to be loaded
export default [
  loadProductBundleData,
  saveConfiguredProducts,
];
