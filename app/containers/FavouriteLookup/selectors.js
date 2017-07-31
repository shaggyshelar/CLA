import { createSelector } from 'reselect';

/**
 * Direct selector to the favouriteLookup state domain
 */
const selectFavouriteLookupDomain = () => (state) => state.get('favouriteLookup');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FavouriteLookup
 */

const makeSelectFavouriteLookup = () => createSelector(
  selectFavouriteLookupDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFavouriteLookup;
export {
  selectFavouriteLookupDomain,
};
