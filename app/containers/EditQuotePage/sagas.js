import { take, call } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { LOAD_REPOS } from 'containers/App/constants';
import { SAVE_CUSTOM_SEGMENT_DATA } from './constants';
import { SERVER_URL, EntityURLs } from '../App/constants';
// import { loadReConfigureProductsDataSuccess, dataLoadingError, configuredProductsSaveSuccess } from './actions';

export function* saveSegmentData(data) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveCustomSegments`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    yield call(request, requestURL, options);
   // yield put(configuredProductsSaveSuccess(products));
  } catch (err) {
   // yield put(dataLoadingError(err));
  }
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
