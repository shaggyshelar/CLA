import { createSelector } from 'reselect';

const selectPriceBookDomain = (state) => state.get('priceBook');
const global = (state) => state.get('global');
const makeSelectPriceBook = () => createSelector(
  selectPriceBookDomain,
 (homeState) => homeState.toJS()
);

const save = () => createSelector(
  global,
  (homeState) => homeState.get('showPrice')
);

export {
  selectPriceBookDomain,
  makeSelectPriceBook,
  save,
};

