import { createSelector } from 'reselect';

// const selectEditQuote = (state) => state.get('editQuote');
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
  (homeState) => homeState.get('data')
);

const updateProductState = () => {
  createSelector(
    global,
    (homeState) => homeState.get('data')
  );
};


export {
  // selectEditQuote,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  global,
};
