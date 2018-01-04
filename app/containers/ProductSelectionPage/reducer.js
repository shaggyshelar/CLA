/*
 *
 * ProductSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
  DEFAULT_ACTION,
  SHOW_FILTER,
  LOAD_DATA_ERROR,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_BTN_DATA_SUCCESS,
  LOAD_SEARCH_ITEM_SELECTED,
} from './constants';

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  products: [],
  initialProducts: [],
});

function productSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_FILTER:
      return state
        .set('showFilter', action.data);
    case LOAD_PRODUCTS_DATA:
      toast.dismiss();
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      return state
        .set('products', fromJS(action.products.products))
        .set('guidedSellingQuestions', fromJS([
          {
            Id: '00000000-0000-0000-0000-000000000001',
            Name: 'Model and Range',
            ProcessInputs: [
              {
                ProcessInputId: '00000000-0000-0000-0000-000000000000',
                ProcessInput_Name: 'Model Input',
                Label: 'Which Car model you want to choose?',
                ConfigAttribute: {
                  ID: '00000000-0000-0000-0000-000000000000',
                  Name: 'Model',
                  DataType: 'Checkbox',
                  Value: [
                    {
                      Id: '1',
                      Value: 'Polo',
                      IsSelected: true,
                    },
                    {
                      Id: '1',
                      Value: 'Vento',
                      IsSelected: false,
                    },
                  ],
                },
              },
              {
                ProcessInputId: '00000000-0000-0000-0000-000000000000',
                ProcessInput_Name: 'Price Input',
                Label: 'Select a Price Range?',
                ConfigAttribute: {
                  ID: '00000000-0000-0000-0000-000000000000',
                  Name: 'Price',
                  DataType: 'Range',
                  Value: [
                    {
                      Id: '1',
                      Value: '800000',
                      IsSelected: true,
                    },
                    {
                      Id: '2',
                      Value: '1500000',
                      IsSelected: false,
                    },
                    {
                      Id: '3',
                      Value: '2500000',
                      IsSelected: true,
                    },
                    {
                      Id: '4',
                      Value: '4950000',
                      IsSelected: false,
                    },
                  ],
                },
              },
            ],
          },
          {
            Id: '00000000-0000-0000-0000-000000000002',
            Name: 'Fuel Type and Seating Capacity Input',
            ProcessInputs: [
              {
                ProcessInputId: '00000000-0000-0000-0000-000000000000',
                ProcessInput_Name: 'Fuel Type Input',
                Label: 'Select Fuel Type?',
                ConfigAttribute: {
                  ID: '00000000-0000-0000-0000-000000000000',
                  Name: 'FuelType',
                  DataType: 'RadioButton',
                  Value: [
                    {
                      Id: '1',
                      Value: 'Petrol',
                      IsSelected: true,
                    },
                    {
                      Id: '1',
                      Value: 'Deisel',
                      IsSelected: false,
                    },
                  ],
                },
              },
              {
                ProcessInputId: '00000000-0000-0000-0000-000000000000',
                ProcessInput_Name: 'Seating Capacity Input',
                Label: 'Select a Seating Capacity?',
                ConfigAttribute: {
                  ID: '00000000-0000-0000-0000-000000000000',
                  Name: 'SeatingCapacity',
                  DataType: 'OptionSet',
                  Value: [
                    {
                      Id: '1',
                      Value: '4',
                      IsSelected: true,
                    },
                    {
                      Id: '2',
                      Value: '6',
                      IsSelected: false,
                    },
                    {
                      Id: '3',
                      Value: '8',
                      IsSelected: true,
                    },
                    {
                      Id: '4',
                      Value: '2',
                      IsSelected: false,
                    },
                  ],
                },
              },
            ],
          },
        ]))
        .set('initialProducts', fromJS(action.products.products))
        .set('loading', false);
    }
    case LOAD_DATA_ERROR:
      toast.dismiss();
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_SEARCH_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SEARCH_DATA_SUCCESS:
      return state
        .set('loading', false);
    case LOAD_SEARCH_BTN_DATA_SUCCESS: {
      let products = state.get('initialProducts').toJS();
      if (!action.emptySearch) {
        products = action.searchedProducts.products;
      }
      return state
        .set('products', fromJS(products))
        .set('loading', false);
    }
    case LOAD_SEARCH_ITEM_SELECTED: {
      const initialProducts = state.get('initialProducts').toJS();
      let selectedProducts = [];
      if (action.name) {
        if (initialProducts && initialProducts.length > 0) {
          const product = _.find(initialProducts, { name: action.name });
          if (product) {
            selectedProducts.push(product);
          }
        } else {
          selectedProducts = state.get('products').toJS();
        }
      } else {
        selectedProducts = state.get('products').toJS();
      }
      return state
        .set('products', fromJS(selectedProducts))
        .set('loading', false);
    }

    default:
      return state;
  }
}

export default productSelectionPageReducer;
