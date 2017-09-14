import { createSelector } from 'reselect';

/**
 * Direct selector to the reConfigureProducts state domain
 */
const selectReConfigureProductsDomain = () => (state) => state.get('reConfigureProducts');

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

export {
  selectReConfigureProductsDomain,
  makeSelectReConfigureProducts,
  getProductBundle,
  getReConfigureProductData,
  getAddOptionState,
  getActiveTabState,
  makeSelectLoading,
  makeSelectError,
};
