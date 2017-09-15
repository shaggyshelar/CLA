import { createSelector } from 'reselect';

/**
 * Direct selector to the editQuoteHeader state domain
 */
const selectEditQuoteHeaderDomain = () => (state) => state.get('editQuoteHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditQuoteHeader
 */
const makeSelectEditQuoteHeader = () => createSelector(
  selectEditQuoteHeaderDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditQuoteHeader;
export {
  selectEditQuoteHeaderDomain,
};
