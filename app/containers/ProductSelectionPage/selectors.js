import { createSelector } from 'reselect';

const selectProductSelectionPageDomain = (state) => state.get('productSelectionPage');
const globalState = (state) => state.get('global');

const makeSelectProductSelectionPage = () => createSelector(
  selectProductSelectionPageDomain,
 (homeState) => homeState.toJS()
);

const showFilter = () => createSelector(
  selectProductSelectionPageDomain,
  (homeState) => homeState.get('showFilter')
);
const getQuoteLines = () => createSelector(
  globalState,
  (homeState) => homeState.getIn(['data'])
);

const makeSelectLoading = () => createSelector(
  selectProductSelectionPageDomain,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectProductSelectionPageDomain,
  (homeState) => homeState.get('error')
);

const makeProductsData = () =>
 createSelector(
  selectProductSelectionPageDomain,
  (homeState) => homeState.getIn(['products'])
);


export {
  selectProductSelectionPageDomain,
  makeSelectProductSelectionPage,
  showFilter,
  makeSelectLoading,
  makeSelectError,
  makeProductsData,
  getQuoteLines,
};

