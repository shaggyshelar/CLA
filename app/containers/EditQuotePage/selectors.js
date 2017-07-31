import { createSelector } from 'reselect';

const selectEditQuote = (state) => state.get('editQuote');
const selectPriceBook = (state) => state.get('priceBook');
const makeSelectLoading = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.get('error')
);

const makeSelectData = () => 
 createSelector(
  selectEditQuote,
  (homeState) => homeState.getIn(['data'])
);

const showPrice = () => 
 createSelector(
  selectPriceBook,
  (homeState) => homeState ? homeState.get('showPrice') : false
);

export {
  selectEditQuote,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  showPrice,
};
