
import { fromJS } from 'immutable';
import suggestionPageReducer from '../reducer';

describe('suggestionPageReducer', () => {
  it('returns the initial state', () => {
    expect(suggestionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
