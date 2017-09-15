import { createSelector } from 'reselect';

// const selectEditQuote = (state) => state.get('editQuote');
const selectEditQuoteDomain = () => (state) => state.get('editQuote');
const global = (state) => state.get('global');
const language = (state) => state.get('language');
const makeSelectLoading = () => createSelector(
  global,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  global,
  (homeState) => homeState.get('error')
);

const makeSelectData = () =>
 createSelector(
  global,
  (homeState) => homeState.get('data')
);

const updateProductState = () => {
  createSelector(
    global,
    (homeState) => homeState.get('data')
  );
};

const getCustomSegments = () =>
 createSelector(
  selectEditQuoteDomain(),
  (homeState) => homeState.get('customSegments')
);

const getCheckAll = () =>
 createSelector(
  selectEditQuoteDomain(),
  (homeState) => homeState.get('isCheckAll')
);
const getLanguage = () =>
 createSelector(
  language,
  (homeState) => homeState.get('locale')
);
export {
  selectEditQuoteDomain,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  updateProductState,
  global,
  getCustomSegments,
  getCheckAll,
  getLanguage,
};
