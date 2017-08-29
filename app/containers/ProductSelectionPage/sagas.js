import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOAD_PRODUCTS_DATA, LOAD_SEARCH_DATA } from './constants';
import { productsDataLoaded, dataLoadingError, searchedDataLoaded, searchBtnDataLoaded } from './actions';
// import { LOAD_REPOS } from 'containers/App/constants';
// import { SERVER_URL, EntityURLs } from '../App/constants';
// import request from 'utils/request';
// Individual exports for testing
export function* getProductsSaga() {
  // See example in containers/HomePage/sagas.js
  try {
    // const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}`;
    // const requestURL = 'http://192.168.101.162:3000/api/products';
    // const repos = yield call(request, requestURL);
    const repos = [
      {
        id: '123',
        code: 'P121',
        name: 'abcd',
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
        canSegment: false,
        segmentData: null,
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
        id: '1234',
        code: 'P121',
        name: 'xyz',
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
        canSegment: false,
        segmentData: null,
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
        id: '1235',
        code: 'P121',
        name: 'pqr',
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
        canSegment: false,
        segmentData: null,
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
    ];

    yield put(productsDataLoaded(repos));
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* productsData() {
  const watcher = yield takeLatest(LOAD_PRODUCTS_DATA, getProductsSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* searchedProducts(data) {
  try {
    const repos = [
      {
        id: '123',
        code: 'P121',
        name: 'abcd',
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
        canSegment: false,
        segmentData: null,
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
        id: '1234',
        code: 'P121',
        name: 'xyz',
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
        canSegment: false,
        segmentData: null,
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
        id: '1235',
        code: 'P121',
        name: 'pqr',
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
        canSegment: false,
        segmentData: null,
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
    ];
    const updatedRecord = _.filter(repos, { name: data.searchObj.searchValue });
    if (!data.searchObj.fromSearch) {
      yield put(searchedDataLoaded(updatedRecord));
    } else {
      yield put(searchBtnDataLoaded(updatedRecord));
    }
    searchBtnDataLoaded(updatedRecord);
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* searchedData() {
  const watcher = yield takeLatest(LOAD_SEARCH_DATA, searchedProducts);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[
  productsData,
  searchedData,
];
