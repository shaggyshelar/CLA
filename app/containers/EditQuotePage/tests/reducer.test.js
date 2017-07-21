
import { fromJS } from 'immutable';
import editQuoteReducer from '../reducer';

describe('editQuoteReducer', () => {
  it('returns the initial state', () => {
    expect(editQuoteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
