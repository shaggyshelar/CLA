
import { fromJS } from 'immutable';
import tableHeaderReducer from '../reducer';

describe('tableHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(tableHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
