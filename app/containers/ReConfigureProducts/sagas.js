import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { LOAD_CONFIGURE_PRODUCTS_DATA } from './constants';
import { loadReConfigureProductsDataSuccess, dataLoadingError } from './actions';

// Individual exports for testing
export function* getProductBundleSaga() {
  // See example in containers/HomePage/sagas.js
  try {
    // const requestURL = `${SERVER_URL + EntityURLs.PRODUCTS}`;
    // const requestURL = 'http://192.168.101.162:3000/api/products';
    // const repos = yield call(request, requestURL);
    const productBundleData = {
      productBundle: {
        id: 1,
        quoteId: 123,
        name: 'Meal',
        products: [
          {
            id: 123,
            code: 'P121',
            name: 'ABCD',
            featureId: 123,
            categoryId: 123,
           // categoryId: null,
            isDependent: true,
            optionSelectionMethod: 123,
            optionLayout: 'wizard/section/tab',
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
            id: 234,
            code: 'P122sds',
            name: 'EFGHfsadfad',
            featureId: 456,
            categoryId: 456,
            // categoryId: null,
            isDependent: true,
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
          {
            id: 145,
            code: 'P122',
            name: 'EFGH',
            featureId: 789,
            // categoryId: 456,
            // featureId: null,
           // categoryId: null,
            isDependent: true,
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
          {
            id: 980,
            code: 'P122dfgsad',
            name: 'EFGHgsdfg',
            featureId: null,
            // featureId: 789,
           // categoryId: 456,
            categoryId: null,
            isDependent: true,
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
        categories: [
          {
            id: 123,
            name: 'Hardware',
          },
          {
            id: 456,
            name: 'Software',
          },
        ],
        features: [
          {
            id: 123,
            categoryId: 123,
          //  categoryId: null,
            name: 'Drinks',
            DynamicAddEnabled: true,
          },
          {
            id: 456,
          // categoryId: 456,
            categoryId: null,
            name: 'Mc Meal',
            DynamicAddEnabled: false,
          },
          {
            id: 789,
            // categoryId: 456,
            categoryId: null,
            name: 'Mc Meal',
            DynamicAddEnabled: false,
          },
        ],
      },
      config: {},
    };
    yield put(loadReConfigureProductsDataSuccess(productBundleData));
  } catch (error) {
    yield put(dataLoadingError(error));
  }
}

export function* loadProductBundleData() {
  const watcher = yield takeLatest(LOAD_CONFIGURE_PRODUCTS_DATA, getProductBundleSaga);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[loadProductBundleData];


// // import { take, call, put, select } from 'redux-saga/effects';

// // Individual exports for testing
// export function* defaultSaga() {
//   // See example in containers/HomePage/sagas.js
// }

// // All sagas to be loaded
// export default [
//   defaultSaga,
// ];
