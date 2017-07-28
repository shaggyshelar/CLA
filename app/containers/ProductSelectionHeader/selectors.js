import { createSelector } from 'reselect';

const selectProductSelectionHeaderDomain = () =>
  (state) =>
    state.get('productSelectionHeader');

const makeSelectProductSelectionHeader = () => createSelector(
  selectProductSelectionHeaderDomain(),
  (substate) => substate.toJS()
);

export default makeSelectProductSelectionHeader;
export {
  selectProductSelectionHeaderDomain,
};
