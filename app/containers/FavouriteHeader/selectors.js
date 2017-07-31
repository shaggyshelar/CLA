import { createSelector } from 'reselect';

/**
 * Direct selector to the favouriteHeader state domain
 */
const selectFavouriteHeaderDomain = () => (state) => state.get('favouriteHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FavouriteHeader
 */

const makeSelectFavouriteHeader = () => createSelector(
  selectFavouriteHeaderDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFavouriteHeader;
export {
  selectFavouriteHeaderDomain,
};
