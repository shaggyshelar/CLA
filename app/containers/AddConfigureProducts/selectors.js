import { createSelector } from 'reselect';

/**
 * Direct selector to the addConfigureProducts state domain
 */
const selectAddConfigureProductsDomain = () => (state) => state.get('addConfigureProducts');

const language = (state) => state.get('language');

const quote = (state) => state.get('global');

const reconfigure = (state) => state.get('reConfigureProducts');
/**
 * Other specific selectors
 */


/**
 * Default selector used by AddConfigureProducts
 */

const makeSelectAddConfigureProducts = () => createSelector(
  selectAddConfigureProductsDomain(),
  (substate) => substate.toJS()
);

const makeProductsData = () =>
 createSelector(
  selectAddConfigureProductsDomain(),
  (homeState) => homeState.get('productsData')
);
const makeSelectLoading = () => createSelector(
  selectAddConfigureProductsDomain(),
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectAddConfigureProductsDomain(),
  (homeState) => homeState.get('error')
);

const getLanguage = () =>
 createSelector(
  language,
  (homeState) => homeState.get('locale')
);

const getReConfigureQuoteData = () =>
 createSelector(
  reconfigure,
  (homeState) => homeState.get('quoteData')
);

const getReConfigureProductData = () =>
 createSelector(
  reconfigure,
  (homeState) => homeState.get('reConfigureProductData')
);

export {
  selectAddConfigureProductsDomain,
  makeSelectAddConfigureProducts,
  makeProductsData,
  makeSelectLoading,
  makeSelectError,
  getLanguage,
  getReConfigureQuoteData,
  getReConfigureProductData,
};
