import { createSelector } from 'reselect';

/**
 * Direct selector to the tableHeader state domain
 */
const selectTableHeaderDomain = () => (state) => state.get('tableHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TableHeader
 */

const makeSelectTableHeader = () => createSelector(
  selectTableHeaderDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTableHeader;
export {
  selectTableHeaderDomain,
};
