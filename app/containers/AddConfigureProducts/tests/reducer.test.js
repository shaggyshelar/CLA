
import { fromJS } from 'immutable';
import addConfigureProductsReducer from '../reducer';

describe('addConfigureProductsReducer', () => {
  it('returns the initial state', () => {
    expect(addConfigureProductsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
