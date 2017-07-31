import { createSelector } from 'reselect';

//const selectEditQuote = (state) => state.get('editQuote');
const global = (state) => state.get('global');
const makeSelectLoading = () => createSelector(
  global,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  global,
  (homeState) => homeState.get('error')
);

const makeSelectData = () => 
 createSelector(
  global,
  (homeState) => homeState.getIn(['data'])
);

const showPrice = () => 
 createSelector(
  global,
  (homeState) => homeState ? homeState.get('showPrice') : false
);

export {
  //selectEditQuote,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  showPrice,
  global,
};
