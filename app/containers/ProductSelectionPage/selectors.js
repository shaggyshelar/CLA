import { createSelector } from 'reselect';

/**
 * Direct selector to the productSelectionPage state domain
 */
const selectProductSelectionPageDomain = () => (state) => state.get('productSelectionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductSelectionPage
 */

const makeSelectProductSelectionPage = () => createSelector(
  selectProductSelectionPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectProductSelectionPage;
export {
  selectProductSelectionPageDomain,
};
