import { createSelector } from 'reselect';

/**
 * Direct selector to the groupQuote state domain
 */
const selectGroupQuoteDomain = () => (state) => state.get('groupQuote');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GroupQuote
 */

const makeSelectGroupQuote = () => createSelector(
  selectGroupQuoteDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGroupQuote;
export {
  selectGroupQuoteDomain,
};
