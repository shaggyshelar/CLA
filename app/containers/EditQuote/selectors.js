import { createSelector } from 'reselect';

/**
 * Direct selector to the editQuote state domain
 */
const selectEditQuoteDomain = () => (state) => state.get('editQuote');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditQuote
 */

const makeSelectEditQuote = () => createSelector(
  selectEditQuoteDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditQuote;
export {
  selectEditQuoteDomain,
};
