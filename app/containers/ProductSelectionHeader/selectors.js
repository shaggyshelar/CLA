import { createSelector } from 'reselect';

/**
 * Direct selector to the productSelectionHeader state domain
 */
const selectProductSelectionHeaderDomain = () => (state) => state.get('productSelectionHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductSelectionHeader
 */

const makeSelectProductSelectionHeader = () => createSelector(
  selectProductSelectionHeaderDomain(),
  (substate) => substate.toJS()
);

export default makeSelectProductSelectionHeader;
export {
  selectProductSelectionHeaderDomain,
};
