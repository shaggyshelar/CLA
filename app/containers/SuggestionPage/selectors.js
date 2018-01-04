import { createSelector } from 'reselect';

/**
 * Direct selector to the suggestionPage state domain
 */
const selectSuggestionPageDomain = () => (state) => state.get('suggestionPage');

const global = (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SuggestionPage
 */

const makeSelectSuggestionPage = () => createSelector(
  selectSuggestionPageDomain(),
  (substate) => substate.toJS()
);

const getGlobalQuoteData = () =>
 createSelector(
  global,
  (homeState) => homeState.get('data')
);

const makeSelectLoading = () => createSelector(
  selectSuggestionPageDomain(),
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectSuggestionPageDomain(),
  (homeState) => homeState.get('error')
);

const getSuggestionsData = () => createSelector(
  selectSuggestionPageDomain(),
  (homeState) => homeState.get('suggestionsData')
);

export {
  makeSelectSuggestionPage,
  selectSuggestionPageDomain,
  getGlobalQuoteData,
  makeSelectLoading,
  makeSelectError,
  getSuggestionsData,
};
