
import { fromJS } from 'immutable';
import groupQuoteReducer from '../reducer';

describe('groupQuoteReducer', () => {
  it('returns the initial state', () => {
    expect(groupQuoteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
