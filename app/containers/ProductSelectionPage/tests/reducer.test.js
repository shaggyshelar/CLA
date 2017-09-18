
import { fromJS } from 'immutable';
import productSelectionPageReducer from '../reducer';

describe('productSelectionPageReducer', () => {
  it('returns the initial state', () => {
    expect(productSelectionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
