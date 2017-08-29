import { createSelector } from 'reselect';

/**
 * Direct selector to the segmentedQuote state domain
 */
const selectSegmentedQuoteDomain = () => (state) => state.get('segmentedQuote');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SegmentedQuote
 */

const makeSelectSegmentedQuote = () => createSelector(
  selectSegmentedQuoteDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSegmentedQuote;
export {
  selectSegmentedQuoteDomain,
};
