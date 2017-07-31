
import { fromJS } from 'immutable';
import favouriteHeaderReducer from '../reducer';

describe('favouriteHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(favouriteHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
