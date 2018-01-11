import request from 'utils/request';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { take, call, put, actionChannel, select } from 'redux-saga/effects';
import { LOAD_CONFIGURE_PRODUCTS_DATA, SAVE_CONFIGURE_PRODUCTS_DATA, TOGGLE_CHECKBOX_CHANGE } from './constants';
import { loadReConfigureProductsDataSuccess, reconfigureDataLoadingError } from './actions';
import { saveConfiguration } from '../App/actions';
import { SERVER_URL, EntityURLs } from '../App/constants';
import { selectReConfigureProductsDomain } from '../ReConfigureProducts/selectors';

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
      yield put(saveConfiguration(quotes));
    }
  } catch (err) {
    yield put(reconfigureDataLoadingError(err));
  }
}

export function* applyImmediateConfig(productData) {
  if (productData.applyImmediately) {
    const reConfigureProductsDomain = yield select(selectReConfigureProductsDomain());
    const reConfigureProductsDomainData = _.cloneDeep(reConfigureProductsDomain.toJS());
    const updatedQuote = reConfigureProductsDomainData.quoteData;
    const updatedProducts = [];
    const intialProductBundleData = reConfigureProductsDomainData.productBundleData;
    const updatedProductBundleData = reConfigureProductsDomainData.reConfigureProductData;
    if (updatedProductBundleData.categories.length > 0) {
      updatedProductBundleData.categories.forEach((category) => {
        category.features.forEach((feature) => {
          feature.products.forEach((currrentProduct) => {
            const product = currrentProduct;
            if (product.tempId) {
              product.id = product.tempId;
            }
            if (category.name === 'Other') {
              product.categoryId = null;
            }
            if (feature.name === 'Other Options') {
              product.featureId = null;
            }
            updatedProducts.push(product);
          }, this);
        }, this);
      }, this);
    } else if (updatedProductBundleData.features.length > 0) {
      updatedProductBundleData.features.forEach((feature) => {
        feature.products.forEach((currrentProduct) => {
          const product = currrentProduct;
          if (product.tempId) {
            product.id = product.tempId;
          }
          if (feature.name === 'Other Options') {
            product.featureId = null;
          }
          updatedProducts.push(product);
        }, this);
      }, this);
    }

    intialProductBundleData.products = [];
    intialProductBundleData.products = updatedProducts;

    const quoteProductData = {
      quote: updatedQuote,
      productBundle: intialProductBundleData,
    };


    try {
      const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/ApplyImmediateConfiguration`}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteProductData),
      };
      const quotes = yield call(request, requestURL, options);
      if (quotes.quoteProductData.quote.errorMessages.length > 0) {
        yield put(reconfigureDataLoadingError(quotes.quoteProductData.quote.errorMessages));
      } else {
        yield put(loadReConfigureProductsDataSuccess(quotes));
      }
    } catch (err) {
      yield put(reconfigureDataLoadingError(err));
    }
  }
}

export function* saveConfiguredProducts() {
  const chan = yield actionChannel(SAVE_CONFIGURE_PRODUCTS_DATA);
  while (true) {
    const { data, locationQuery } = yield take(chan);
    yield call(saveProducts, data, locationQuery);
  }
}

export function* applyImmediateConfigProd() {
  // Create a channel outside while loop for request actions on the same page
  const chan = yield actionChannel(TOGGLE_CHECKBOX_CHANGE);
  while (true) {
    const { product } = yield take(chan);
    yield call(applyImmediateConfig, product);
  }
}

export function* loadProductBundleData() {
  const chan = yield actionChannel(LOAD_CONFIGURE_PRODUCTS_DATA);
  while (true) {
    const { data } = yield take(chan);
    yield call(getProductBundleSaga, data);
  }
}

// All sagas to be loaded
export default [
  applyImmediateConfigProd,
  loadProductBundleData,
  saveConfiguredProducts,
];
