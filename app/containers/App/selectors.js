import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
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
export {
  makeSelectData,
  selectGlobal,
  makeSelectLocationState,

};
