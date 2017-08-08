
import { fromJS } from 'immutable';
import reConfigureProductsReducer from '../reducer';

describe('reConfigureProductsReducer', () => {
  it('returns the initial state', () => {
    expect(reConfigureProductsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
