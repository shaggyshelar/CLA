
import { fromJS } from 'immutable';
import segmentedQuoteReducer from '../reducer';

describe('segmentedQuoteReducer', () => {
  it('returns the initial state', () => {
    expect(segmentedQuoteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
