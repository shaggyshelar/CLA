
import { fromJS } from 'immutable';
import editQuoteHeaderReducer from '../reducer';

describe('editQuoteHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(editQuoteHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
