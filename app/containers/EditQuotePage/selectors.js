import { createSelector } from 'reselect';

const selectEditQuote = (state) => state.get('editQuote');

const makeSelectCurrentUser = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.get('error')
);

const makeSelectData = () => createSelector(
  selectEditQuote,
  (homeState) => homeState.getIn(['data'])
);


export {
  selectEditQuote,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  makeSelectCurrentUser,
};
