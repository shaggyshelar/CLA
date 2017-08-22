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
      // products: [
      //   {
      //     id: 123,
      //     type: 'Product/Bundle',
      //     code: 'P121',
      //     name: 'ABCD',
      //     isDependent: true,
      //     optionSelectionMethod: 123,
      //     optionLayout: 'wizard/section/tab',
      //     quantity: {
      //       value: 123,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 123,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //     listPrice: {
      //       value: 123,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 123,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: 234,
      //     code: 'P122sds',
      //     name: 'EFGHfsadfad',
      //     isDependent: true,
      //     optionSelectionMethod: 456,
      //     optionLayout: 'wizard/section/tab',
      //     quantity: {
      //       value: 565,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 123,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //     listPrice: {
      //       value: 654,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 554,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: 145,
      //     code: 'P122',
      //     name: 'EFGH',
      //     isDependent: true,
      //     optionSelectionMethod: 456,
      //     optionLayout: 'wizard/section/tab',
      //     quantity: {
      //       value: 565,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 123,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //     listPrice: {
      //       value: 654,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 554,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: 980,
      //     code: 'P122dfgsad',
      //     name: 'EFGHgsdfg',
      //     isDependent: true,
      //     optionSelectionMethod: 456,
      //     optionLayout: 'wizard/section/tab',
      //     quantity: {
      //       value: 565,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 123,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //     listPrice: {
      //       value: 654,
      //       isEditable: true,
      //       isVisible: true,
      //       dataType: 'text/select/textarea/inputSelect',
      //       selectValues: [
      //         {
      //           id: 554,
      //           value: ':List',
      //           isSelected: true,
      //         },
      //       ],
      //     },
      //   },
      // ],
      products: [
        {
          id: 123,
          code: 'P121',
          name: 'ABCD',
          featureId: 123,
          categoryId: 123,
              // categoryId: null,
          isDependent: true,
          isSelected: true,
          isRequired: true,
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
          code: 'P122',
          name: 'EFGH',
          featureId: 123,
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
