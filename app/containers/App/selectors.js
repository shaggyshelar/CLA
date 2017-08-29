import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const language = (state) => state.get('language');
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
const makeSelectData = () =>
 createSelector(
  selectGlobal,
  (homeState) => homeState.getIn(['data'])
);
const getLanguage = () =>
 createSelector(
  language,
  (homeState) => homeState.getIn('locale')
);
export {
  makeSelectData,
  selectGlobal,
  makeSelectLocationState,
  getLanguage,
};
