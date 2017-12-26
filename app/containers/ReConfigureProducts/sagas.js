import request from 'utils/request';
import { browserHistory } from 'react-router';
import { take, call, put, actionChannel } from 'redux-saga/effects';
import { LOAD_CONFIGURE_PRODUCTS_DATA, SAVE_CONFIGURE_PRODUCTS_DATA, APPLY_IMMEDIATELY } from './constants';
import { loadReConfigureProductsDataSuccess, reconfigureDataLoadingError } from './actions';
import { saveConfiguration } from '../App/actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

export function* getProductBundleSaga(data) {
  // const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/ReconfigureProduct?ProductId=${data.productId}&PriceListId=${data.priceBookId}&QuoteId=${data.quoteId}&LineId=${data.quoteLineId}&GroupId=${data.groupId}`}`;
  try {
   // const repos = yield call(request, requestURL);
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/ReconfigureProduct`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const repos = yield call(request, requestURL, options);
    yield put(loadReConfigureProductsDataSuccess(repos));
  } catch (err) {
    yield put(reconfigureDataLoadingError(err));
  }
}

export function* saveProducts(data, locationQuery) {
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
      yield put(reconfigureDataLoadingError(quotes.quote.errorMessages));
    } else {
      if (locationQuery.groupId !== null && locationQuery.groupId !== undefined && locationQuery.mainTab !== undefined && locationQuery.tab !== undefined) {
        browserHistory.push(`/EditQuote?groupId=${locationQuery.groupId}&mainTab=2&tab=${locationQuery.tab}`);
      } else if ((locationQuery.groupId === null || locationQuery.groupId === undefined) && locationQuery.mainTab !== undefined) {
        browserHistory.push(`/EditQuote?mainTab=2&tab=${locationQuery.tab}`);
      } else {
        browserHistory.push('/EditQuote');
      }
      yield put(loadReConfigureProductsDataSuccess(quotes));
    }
  } catch (err) {
    yield put(reconfigureDataLoadingError(err));
  }
}

export function* applyImmediateConfig(data, locationQuery) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/ApplyImmediateConfiguration`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    yield put(loadReConfigureProductsDataSuccess(quotes));
  } catch (err) {
    yield put(reconfigureDataLoadingError(err));
}
}

export function* saveConfiguredProducts() {
  while (true) {
    const chan = yield actionChannel(SAVE_CONFIGURE_PRODUCTS_DATA);
    const { data, locationQuery } = yield take(chan);
    yield call(saveProducts, data, locationQuery);
  }
}

export function* applyImmediateConfigProd() {
  while (true) {
    const chan = yield actionChannel(APPLY_IMMEDIATELY);
    const { data, locationQuery } = yield take(chan);
    yield call(applyImmediateConfig , data, locationQuery);
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
  applyImmediateConfigProd,
  loadProductBundleData,
  saveConfiguredProducts
];
