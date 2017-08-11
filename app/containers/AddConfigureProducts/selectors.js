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

export default makeSelectAddConfigureProducts;
export {
  selectAddConfigureProductsDomain,
};
