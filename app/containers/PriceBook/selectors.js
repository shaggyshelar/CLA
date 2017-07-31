import { createSelector } from 'reselect';

const selectPriceBookDomain = (state) => state.get('priceBook');

const makeSelectPriceBook = () => createSelector(
  selectPriceBookDomain,
 (homeState) => homeState.toJS()
);

const save = () => createSelector(
  selectPriceBookDomain,
  (homeState) => homeState.get('showPriceBook')
);

export {
  selectPriceBookDomain,
  makeSelectPriceBook,
  save,
};

