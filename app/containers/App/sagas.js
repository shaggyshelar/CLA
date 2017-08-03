import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError, xrmDataLoaded } from '../App/actions';
import { SERVER_URL, EntityURLs, LOAD_DATA, LOAD_XRM_DATA } from '../App/constants';

export function* getData() {
  // Select username from store
  // const requestURL = SERVER_URL + EntityURLs.QUOTE;
  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    const repos = {
      priceList: null,
      headers: [],
      products: [
        {
          _id: '596db79f58d3f94623033cd0',
          'PRODUCT CODE': 'Tillman',
          'PRODUCT NAME': 'Bradley',
          'LIST UNIT PRICE': '$ 332.9494',
          balance: '$2,234.27',
          'ADDITIONAL DISC.': '',
          'NET UNIT PRICE': '$ 625.0061',
          'NET TOTAL': '$ 25.9874',
          QUANTITY: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          'PRODUCT CODE': 'Hernandez',
          'PRODUCT NAME': 'Holman',
          'LIST UNIT PRICE': '$ 700.7878',
          balance: '$2,407.24',
          'ADDITIONAL DISC.': '',
          'NET UNIT PRICE': '$ 506.595',
          'NET TOTAL': '$ 502.2979',
          QUANTITY: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          'PRODUCT CODE': 'Burch',
          'PRODUCT NAME': 'Collins',
          'LIST UNIT PRICE': '$ 964.9937',
          balance: '$2,023.00',
          'ADDITIONAL DISC.': '',
          'NET UNIT PRICE': '$ 269.6924',
          'NET TOTAL': '$ 305.6421',
          QUANTITY: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          'PRODUCT CODE': 'Coleman',
          'PRODUCT NAME': 'Hunter',
          'LIST UNIT PRICE': '$ 833.9739',
          balance: '$2,644.06',
          'ADDITIONAL DISC.': '',
          'NET UNIT PRICE': '$ 942.7997',
          'NET TOTAL': '$ 72.1729',
          QUANTITY: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          'PRODUCT CODE': 'Lorene',
          'PRODUCT NAME': 'Brennan',
          'LIST UNIT PRICE': '$ 804.2955',
          balance: '$1,677.35',
          'ADDITIONAL DISC.': '',
          'NET UNIT PRICE': '$ 121.7662',
          'NET TOTAL': '$ 487.7556',
          QUANTITY: 77.3144,
        },
      ],
    };
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* getXrmData() {
  // Select username from store
  // const requestURL = 'https://esplsol.crm8.dynamics.com/api/data/v8.0/products?$select=name,productnum' +
  //     'ber,standardcost,description,p2qes_quantityeditable';
  // const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}?$select=name,productnumber,standardcost,description,p2qes_quantityeditable`;
  try {
    const extendedQuery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
      "<entity name='product'>" +
      "<attribute name='name' />" +
      "<attribute name='productid' />" +
      "<attribute name='productnumber' />" +
      "<attribute name='description' />" +
      "<attribute name='statecode' />" +
      "<attribute name='productstructure' />" +
      "<order attribute='productnumber' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='name' operator='not-null' />" +
      "<condition attribute='standardcost' operator='not-null' />" +
      "<condition attribute='p2qes_quantityeditable' operator='not-null' />" +
      "<condition attribute='description' operator='not-null' />" +
      '</filter>' +
      "<link-entity name='productpricelevel' from='productid' to='productid'>" +
      "<attribute name='amount' />" +
      "<attribute name='pricingmethodcode' />" +
      "<attribute name='pricelevelid' />" +
      "<filter type='and'>" +
      "<condition attribute='amount' operator='not-null' />" +
      "<condition attribute='pricingmethodcode' operator='not-null' />" +
      "<condition attribute='pricelevelid' operator='eq' uiname='Big billion day' uitype='pricelevel' value='{D3B8550E-7D6B-E711-812B-C4346BDCAEF1}' />" +
      '</filter>' +
      '</link-entity>' +
      "<link-entity name='productassociation' to='productid' from='productid'>" +
      "<attribute name='associatedproduct' />" +
      '</link-entity>' +
      '</entity>' +
      '</fetch>';
    const requestURL = `${SERVER_URL}/api/data/v8.0/${EntityURLs.PRODUCTS}?fetchXml=${extendedQuery}`;

    const headers = {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'OData-MaxVersion': '4.0',
        Prefer: 'odata.include-annotations="*"',
        'OData-Version': '4.0',
      },
    };

    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL, headers);
    yield put(xrmDataLoaded(repos.value));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}


// Individual exports for testing
export function* dataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_DATA, getData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* xrmDataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_XRM_DATA, getXrmData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  dataSaga,
  xrmDataSaga,
];
