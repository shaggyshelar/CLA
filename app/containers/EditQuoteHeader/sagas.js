// import request from 'utils/request';
// import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
// import { LOCATION_CHANGE } from 'react-router-redux';
// // import { LOAD_REPOS } from 'containers/App/constants';
// import { LOAD_DATA } from '../App/constants';
// import { dataLoaded, dataLoadingError } from './actions';


// export function* getData() {
//   // Select username from store
//   const requestURL = 'http://localhost:3000/api/quote';

//   try {
//     // Call our request helper (see 'utils/request')
//     const repos = yield call(request, requestURL);
//     yield put(dataLoaded(repos));
//   } catch (err) {
//     yield put(dataLoadingError(err));
//   }
// }

// // Individual exports for testing
// export function* dataSaga() {
//   // See example in containers/HomePage/sagas.js
//   const watcher = yield takeLatest(LOAD_DATA, getData);

//   // Suspend execution until location changes
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }

// // All sagas to be loaded
// export default [
//   dataSaga,
// ];
