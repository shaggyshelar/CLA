// /*
//  *
//  * EditQuote actions
//  *
//  */

// import {
//   DEFAULT_ACTION,
//   LOAD_DATA,
//   CLONE_LINE,
//   DELETE_LINE,
//   LOAD_DATA_ERROR,
//   LOAD_DATA_SUCCESS,
//   LOAD_XRM_DATA,
//   LOAD_XRM_DATA_SUCCESS,
// } from './constants';

// export function defaultAction() {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }/*


// import {
//   DEFAULT_ACTION,
// } from './constants';

// export function defaultAction() {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }


// export function loadXrmData() {
//   return {
//     type: LOAD_XRM_DATA,
//   };
// }

// export function loadData() {
//   return {
//     type: LOAD_DATA,
//   };
// }
// export function cloneLine(data) {
//   return {
//     type: CLONE_LINE,
//     data: data,
//   };
// }
// export function deleteLine(data) {
//   return {
//     type: DELETE_LINE,
//     data: data,
//   };
// }
// export function dataLoaded(data) {
//   return {
//     type: LOAD_DATA_SUCCESS,
//     data: data,
//   };
// }

// export function dataLoadingError(error) {
//   return {
//     type: LOAD_DATA_ERROR,
//     error,
//   };
// }

// export function xrmDataLoaded(data) {
//   return {
//     type: LOAD_XRM_DATA_SUCCESS,
//     xrmData: data,
//   };
// }


// import {
//   DEFAULT_ACTION,
// } from './constants';

// export function defaultAction() {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }

import {
  DEFAULT_ACTION,
  //
  LOAD_CUSTOM_SEGMENT_DATA,
  ADD_CUSTOM_SEGMENT_DATA,
  DELETE_CUSTOM_SEGMENT_DATA,
  SAVE_CUSTOM_SEGMENT_DATA,
  CHANGE_CUSTOM_SEGMENT_FIELD_DATA,
  CHECK_ALL_CUSTOM_SEGMENT_DATA,
  CHECK_CUSTOM_SEGMENT_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
//
export function loadCustomSegmentsData(customSegments) {
  console.log('loadCustomSegmentsData', customSegments);
  return {
    type: LOAD_CUSTOM_SEGMENT_DATA,
    customSegments,
  };
}

export function addCustomSegmentData() {
  return {
    type: ADD_CUSTOM_SEGMENT_DATA,
  };
}

export function deleteCustomSegmentData() {
  return {
    type: DELETE_CUSTOM_SEGMENT_DATA,
  };
}

export function changeCustomSegmentFieldData(field, value, id) {
  return {
    type: CHANGE_CUSTOM_SEGMENT_FIELD_DATA,
    field,
    value,
    id,
  };
}

export function saveCustomSegmentData(segments) {
  return {
    type: SAVE_CUSTOM_SEGMENT_DATA,
    segments,
  };
}

export function checkAllCustomSegmentData() {
  return {
    type: CHECK_ALL_CUSTOM_SEGMENT_DATA,
  };
}

export function checkCustomSegmentData() {
  return {
    type: CHECK_CUSTOM_SEGMENT_DATA,
  };
}
