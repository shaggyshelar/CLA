import { createSelector } from 'reselect';

/**
 * Direct selector to the addConfigureProducts state domain
 */
const selectAddConfigureProductsDomain = () => (state) => state.get('addConfigureProducts');

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

export {
  selectAddConfigureProductsDomain,
  makeSelectAddConfigureProducts,
  makeProductsData,
  makeSelectLoading,
  makeSelectError,
};
