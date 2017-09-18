import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const getGroups = () =>
 createSelector(
  selectGlobal,
  (homeState) => homeState.getIn(['data', 'groups'])
);
const getLines = () =>
 createSelector(
  selectGlobal,
  (homeState) => homeState.getIn(['data', 'lines'])
);
export {
  selectGlobal,
  getGroups,
  getLines,
};
