import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError, xrmDataLoaded } from '../App/actions';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
  LOAD_XRM_DATA,
  DELETE_MULTIPLE_LINES,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
} from '../App/constants';

export function* getData() {
  // Select username from store const requestURL = SERVER_URL + EntityURLs.QUOTE;
  try {
    // Call our request helper (see 'utils/request') let repos = yield call(request,
    // 'https://14.141.105.180:1823/api/values/GetUserName/1?callback=ab');
    const repos = {
      quote: {
        id: '1',
        name: 'sample',
        netAmount: 123,
        customerAmount: 123,
        paymentTerms: 123,
        priceBookId: '',
        linesGrouped: true,
        expirationDate: 'Date',
        isPrimary: true,
        type: 'Quote/Renewal/Amendement',
        lines: [
          {
            id: '123',
            code: 'P121',
            name: 'ABCD',
            type: 'Product/Bundle',
            isBundled: true,
            isDisableReconfiguration: true,
            groupId: 123,
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            segmentData: {
              type: 'Year/Quarter/Month/Custom/OneTime',
              columns: [
                {
                  name: 'Dimension 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '123ass',
            code: 'P121',
            name: 'Testing1',
            type: 'Product',
            isBundled: true,
            isDisableReconfiguration: true,
            groupId: 123,
            markup: 123,
            quantity: {
              value: 123,
              isEditable: false,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            segmentData: {
              type: 'Year/Quarter/Month/Custom/OneTime',
              columns: [
                {
                  name: 'Dimension 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '123',
            code: 'P121',
            name: 'Testing',
            type: 'Product/Bundle',
            isBundled: true,
            isDisableReconfiguration: true,
            groupId: 123,
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            segmentData: {
              type: 'Year/Quarter/Month/Custom/OneTime',
              columns: [
                {
                  name: 'Dimension 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: ':List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
        ],
        groups: [
          {
            id: 123,
            name: 'Group1',
            isOptional: true,
            description: 'longtext',
            additionaldiscount: 123,
            subscriptionTerm: 123,
          },
        ],
      },
      config: {},
    };
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* getXrmData() {
  // Select username from store const requestURL =
  // 'https://esplsol.crm8.dynamics.com/api/data/v8.0/products?$select=name,produc
  // t num' +     'ber,standardcost,description,p2qes_quantityeditable'; const
  // requestURL = `${SERVER_URL +
  // EntityURLs.PRODUCTS}?$select=name,productnumber,standardcost,description,p2qe
  // s _quantityeditable`;
  try {
    const extendedQuery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='tr" +
        "ue'><entity name='product'><attribute name='name' /><attribute name='productid' " +
        "/><attribute name='productnumber' /><attribute name='description' /><attribute n" +
        "ame='statecode' /><attribute name='productstructure' /><order attribute='product" +
        "number' descending='false' /><filter type='and'><condition attribute='name' oper" +
        "ator='not-null' /><condition attribute='standardcost' operator='not-null' /><con" +
        "dition attribute='p2qes_quantityeditable' operator='not-null' /><condition attri" +
        "bute='description' operator='not-null' /></filter><link-entity name='productpric" +
        "elevel' from='productid' to='productid'><attribute name='amount' /><attribute na" +
        "me='pricingmethodcode' /><attribute name='pricelevelid' /><filter type='and'><co" +
        "ndition attribute='amount' operator='not-null' /><condition attribute='pricingme" +
        "thodcode' operator='not-null' /><condition attribute='pricelevelid' operator='eq" +
        "' uiname='Big billion day' uitype='pricelevel' value='{D3B8550E-7D6B-E711-812B-C" +
        "4346BDCAEF1}' /></filter></link-entity><link-entity name='productassociation' to" +
        "='productid' from='productid'><attribute name='associatedproduct' /></link-entit" +
        'y></entity></fetch>';
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

export function* saveQuoteDetails(data) {
  try {
    const requestURL = 'http://localhost:3000/v1/quote/save/1';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };

    const repos = yield call(request, requestURL, options);
    // yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
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

export function* xrmDataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_XRM_DATA, getXrmData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[dataSaga,
  xrmDataSaga,
  SaveQuotes];
