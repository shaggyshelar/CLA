import { createSelector } from 'reselect';

/**
 * Direct selector to the reConfigureProducts state domain
 */
const selectReConfigureProductsDomain = () => (state) => state.get('reConfigureProducts');
const language = (state) => state.get('language');
const global = (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReConfigureProducts
 */

const makeSelectReConfigureProducts = () => createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.toJS()
);

const getProductBundle = () =>
 createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('productBundleData')
);

const getReConfigureProductData = () =>
 createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('reConfigureProductData')
);

const getAddOptionState = () =>
 createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('fromAddOptions')
);

const getActiveTabState = () =>
 createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('activeTab')
);
const makeSelectLoading = () => createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectReConfigureProductsDomain(),
  (homeState) => homeState.get('error')
);

const getGlobalQuoteData = () =>
 createSelector(
  global,
  (homeState) => homeState.get('data')
);

const getReconfigureQuoteData = () =>
 createSelector(
 selectReConfigureProductsDomain(),
  (homeState) => homeState.get('quoteData')
);

const getLanguage = () =>
 createSelector(
  language,
  (homeState) => homeState.get('locale')
);

export {
  selectReConfigureProductsDomain,
  makeSelectReConfigureProducts,
  getProductBundle,
  getReConfigureProductData,
  getAddOptionState,
  getActiveTabState,
  makeSelectLoading,
  makeSelectError,
  getLanguage,
  getGlobalQuoteData,
  getReconfigureQuoteData,
};
