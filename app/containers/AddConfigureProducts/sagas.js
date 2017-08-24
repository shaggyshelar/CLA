import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_PRODUCTS_DATA } from './constants';
import { loadProductsDataSuccess, dataLoadingError } from './actions';

// Individual exports for testing
export function* getProductsSaga() {
  // See example in containers/HomePage/sagas.js
  try {
    // const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}`;
    // const requestURL = 'http://192.168.101.162:3000/api/products';
    // const repos = yield call(request, requestURL);
    const productsData = {
      products: [
        {
          id: 123353345,
          code: 'P758',
          name: 'pqrst',
          featureId: 123,
          categoryId: 123,
              // categoryId: null,
          isDependent: true,
          isSelected: true,
          isRequired: true,
          isDeleted: false,
          optionSelectionMethod: 123,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 890,
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
        },
        {
          id: 2349797897,
          code: 'qw2342',
          name: 'wyyyr',
          featureId: 123,
          categoryId: 456,
              // categoryId: null,
          isDependent: true,
          isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
      ],
      config: {},
    };
    yield put(loadProductsDataSuccess(productsData));
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* loadProductsData() {
  const watcher = yield takeLatest(LOAD_PRODUCTS_DATA, getProductsSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[loadProductsData];
