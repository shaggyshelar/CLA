import { createSelector } from 'reselect';

const selectProductSelectionPageDomain = (state) => state.get('productSelectionPage');
const globalState = (state) => state.get('global');
const language = (state) => state.get('language');
const makeSelectProductSelectionPage = () => createSelector(
  selectProductSelectionPageDomain,
 (homeState) => homeState.toJS()
);
const getLanguage = () =>
 createSelector(
  language,
  (homeState) => homeState.get('locale')
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
  (homeState) => homeState.get('products')
);

const makeSearchedProductsData = () =>
 createSelector(
  selectProductSelectionPageDomain,
  (homeState) => homeState.get('searchedProducts')
);


export {
  selectProductSelectionPageDomain,
  makeSelectProductSelectionPage,
  showFilter,
  makeSelectLoading,
  makeSelectError,
  makeProductsData,
  getQuoteLines,
  makeSearchedProductsData,
  getLanguage,
};

