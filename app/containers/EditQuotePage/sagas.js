import { take, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { SAVE_CUSTOM_SEGMENT_DATA } from './constants';
// import { loadReConfigureProductsDataSuccess, dataLoadingError, configuredProductsSaveSuccess } from './actions';

export function* saveSegmentData() {
  // const requestURL = '';

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(segment),
  // };
  // yield call(request, requestURL, options);
}

export function* saveCustomSegmentData() {
  const { segment } = yield take(SAVE_CUSTOM_SEGMENT_DATA);
  yield call(saveSegmentData, segment);
  yield take(LOCATION_CHANGE);
}

// All sagas to be loaded
export default [
  saveCustomSegmentData,
];
