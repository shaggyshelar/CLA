import request from 'utils/request';
import { take, call, put, actionChannel } from 'redux-saga/effects';
import { LOAD_PRODUCTS_DATA } from './constants';
import { loadProductsDataSuccess, dataLoadingError } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';

export function* getProductsSaga(params) {
  
  var addOptionViewModel = {
    FeatureId : params.featureId,
    BundleId : params.bundleId,
    PriceListId : params.priceBookId,
    BundleLineId : params.bundleLineId,
    QuoteId : params.quoteId,
    GroupId : params.groupId,
    IsDynamic : params.isDynamic,
    Quote : params.quoteData
    }
  
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/AddOptions`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addOptionViewModel),
    };
   const repos = yield call(request, requestURL, options);
   
    yield put(loadProductsDataSuccess(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* loadProductsData() {
  while (true) {
    const chan = yield actionChannel(LOAD_PRODUCTS_DATA);
    const { params } = yield take(chan);
    yield call(getProductsSaga, params);
  }
}

// All sagas to be loaded
export default[loadProductsData];
