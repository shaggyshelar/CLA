
import { fromJS } from 'immutable';
import priceBookReducer from '../reducer';

describe('priceBookReducer', () => {
  it('returns the initial state', () => {
    expect(priceBookReducer(undefined, {})).toEqual(fromJS({}));
  });
});
