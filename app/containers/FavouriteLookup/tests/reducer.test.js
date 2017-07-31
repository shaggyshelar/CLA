
import { fromJS } from 'immutable';
import favouriteLookupReducer from '../reducer';

describe('favouriteLookupReducer', () => {
  it('returns the initial state', () => {
    expect(favouriteLookupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
