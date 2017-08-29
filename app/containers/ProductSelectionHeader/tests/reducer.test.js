
import { fromJS } from 'immutable';
import productSelectionHeaderReducer from '../reducer';

describe('productSelectionHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(productSelectionHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
