import request from 'utils/request';
import { browserHistory } from 'react-router';
import { take, call, put, actionChannel } from 'redux-saga/effects';
import { LOAD_SUGGESTIONS, SAVE_SUGGESTIONS } from './constants';
import { loadSuggestionsSuccess, loadSuggestionsError } from './actions';
import { SERVER_URL, EntityURLs } from '../App/constants';
import { saveSuggestions } from '../App/actions';

export function* getSuggestions(data) {
  // const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/ReconfigureProduct?ProductId=${data.productId}&PriceListId=${data.priceBookId}&QuoteId=${data.quoteId}&LineId=${data.quoteLineId}&GroupId=${data.groupId}`}`;
  try {
   // const repos = yield call(request, requestURL);
    const requestURL = `${`${SERVER_URL + EntityURLs.PRODUCTS}/SuggestProduct`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const repos = yield call(request, requestURL, options);
    yield put(loadSuggestionsSuccess(repos));
  } catch (err) {
    yield put(loadSuggestionsError(err));
  }
}

export function* loadSuggestions() {
  while (true) {
    const chan = yield actionChannel(LOAD_SUGGESTIONS);
    const { data } = yield take(chan);
    yield call(getSuggestions, data);
  }
}

export function* saveSuggestionsData(data, locationQuery) {
  try {
    const requestURL = `${`${SERVER_URL + EntityURLs.QUOTE}/SaveSuggestions`}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    if (quotes.quote.errorMessages && quotes.quote.errorMessages.length) {
      yield put(loadSuggestionsError(quotes.quote.errorMessages));
    } else {
      if (locationQuery.groupId !== null && locationQuery.groupId !== undefined && locationQuery.mainTab !== undefined && locationQuery.tab !== undefined) {
        browserHistory.push(`/EditQuote?groupId=${locationQuery.groupId}&mainTab=2&tab=${locationQuery.tab}`);
      } else if ((locationQuery.groupId === null || locationQuery.groupId === undefined) && locationQuery.mainTab !== undefined) {
        browserHistory.push(`/EditQuote?mainTab=2&tab=${locationQuery.tab}`);
      } else {
        browserHistory.push('/EditQuote');
      }
      yield put(saveSuggestions(quotes));
    }
  } catch (err) {
    yield put(loadSuggestionsError(err));
  }
}

export function* saveSuggestionsProducts() {
  while (true) {
    const chan = yield actionChannel(SAVE_SUGGESTIONS);
    const { data, locationQuery } = yield take(chan);
    yield call(saveSuggestionsData, data, locationQuery);
  }
}
// All sagas to be loaded
export default [
  loadSuggestions,
  saveSuggestionsProducts,
];
