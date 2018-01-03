/*
 *
 * SuggestionPage reducer
 *
 */
import { generateGuid } from 'containers/App/constants';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
  DEFAULT_ACTION,
  LOAD_SUGGESTIONS,
  LOAD_SUGGESTIONS_SUCCESS,
  LOAD_SUGGESTIONS_ERROR,
  TOGGLE_CHECKBOX_CHANGE,
  SAVE_SUGGESTIONS,
  UPDATE_PRODUCT,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  suggestionsData: {},
  quoteData: {},
});

function suggestionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_SUGGESTIONS:
      toast.dismiss();
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SUGGESTIONS_SUCCESS: {
      const quoteProductData = action.suggestionsData.quoteProductData;
      if (quoteProductData && quoteProductData.productRelatedData && quoteProductData.productRelatedData.relatedProducts) {
        const relatedProducts = [];
        quoteProductData.productRelatedData.relatedProducts.forEach((item) => {
          const updatedItem = item;
          updatedItem.relatedProduct.tempId = generateGuid();
          relatedProducts.push(updatedItem);
        }, this);
        quoteProductData.productRelatedData.relatedProducts = relatedProducts;
      }

      return state
        .set('suggestionsData', fromJS(quoteProductData))
        .set('loading', false);
    }

    case LOAD_SUGGESTIONS_ERROR: {
      toast.dismiss();
      if (action.error && action.error instanceof Array) {
        action.error.map((i) => {
          toast.error(<p>{i.message}</p>, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false,
          });
          return this;
        });
      } else {
        toast.error('Something went wrong.', {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
        });
      }
      return state
        .set('error', action.error)
        .set('loading', false);
    }

    case TOGGLE_CHECKBOX_CHANGE: {
      const suggestionsData = state.get('suggestionsData').toJS();
      const product = _.filter(suggestionsData.productRelatedData.relatedProducts, (item) => item.relatedProduct.tempId === action.item.tempId);
      if (product && product.length > 0) {
        product[0].relatedProduct.isSelected = !product[0].relatedProduct.isSelected;
      }
      return state
        .set('suggestionsData', fromJS(suggestionsData))
        .set('loading', false);
    }

    case SAVE_SUGGESTIONS:
      return state
        .set('loading', true)
        .set('error', false);

    case UPDATE_PRODUCT: {
      const suggestionsData = state.get('suggestionsData').toJS();
      const product = _.filter(suggestionsData.productRelatedData.relatedProducts, (item) => item.relatedProduct.tempId === action.productObj.tempId);
      if (product && product.length > 0) {
        product[0].relatedProduct[action.productObj.field].value = action.productObj.value;
      }
      return state
        .set('suggestionsData', fromJS(suggestionsData))
        .set('loading', false);
    }

    default:
      return state;
  }
}

export default suggestionPageReducer;
