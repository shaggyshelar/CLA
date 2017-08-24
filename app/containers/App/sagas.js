import request from 'utils/request';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataLoaded, dataLoadingError, xrmDataLoaded } from '../App/actions';
import {
  SERVER_URL,
  EntityURLs,
  LOAD_DATA,
  LOAD_XRM_DATA,
  DELETE_MULTIPLE_LINES,
  CALCULATE_SELECTED,
  QUICK_SAVE_QUOTES,
} from '../App/constants';

export function* getData() {
  // Select username from store const requestURL = SERVER_URL + EntityURLs.QUOTE;
  try {
    // Call our request helper (see 'utils/request') let repos = yield call(request,
    // 'https://14.141.105.180:1823/api/values/GetUserName/1?callback=ab');
    const repos = {
      quote: {
        id: '1',
        name: 'Table Quote',
        netAmount: 15000,
        customerAmount: 123,
        paymentTerms: 123,
        priceBookId: '',
        linesGrouped: true,
        expirationDate: 'Date',
        currency: '₹',
        isPrimary: true,
        type: 'Quote/Renewal/Amendement',
        lines: [
          {
            id: '111',
            code: 'Dom154',
            name: 'Porche',
            type: 'Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '456',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            bundleProducts: [{
              parent:'111',
              id: '12456',
              isProductOption: true,
              code: 'Dom154AC',
              name: 'Porche AC',
              type: 'Product',
              isBundled: false,
              isDisableReconfiguration: false,
              groupId: '456',
              markup: 123,
              quantity: {
                value: 123,
                isEditable: false,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              discountSchedule: {
                id: 123,
                name: 'Diwali',
                discountUnit: 'Percent/Amount',
                type: 'Range/Slab',
                tiers: [
                  {
                    id: 123,
                    name: 'tier1',
                    lowerBound: 1,
                    upperBound: 10,
                    discountpercent: 10,
                    discountamount: 123,
                  },
                ],
              },
              canClone: true,
              canSegment: true,
              isSegmented: true,
              segmentData: {
                type: 'Custom',
                columns: [
                  {
                    name: 'Custom',
                    quantity: 345,
                    listPrice: 3453453,
                    uplift: 345345,
                    startDate: 'Date',
                    endDate: 'Date',
                    additionalDiscount: 334534,
                    netunitPrice: 345345,
                    netTotal: 345333,
                  },
                  {
                    name: 'Custom 1',
                    quantity: 123,
                    listPrice: 123,
                    uplift: 123,
                    startDate: 'Date',
                    endDate: 'Date',
                    additionalDiscount: 123,
                    netunitPrice: 123,
                    netTotal: 4512,
                  },
                ],
              },
              canReconfigure: false,
              canShowDiscountScheduler: false,
              listPrice: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              isTaxable: true,
              additionalDiscount: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              netUnitPrice: 123,
              totalPrice: 123,
              netTotal: 123,
              pricingMethod: {
                values: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                  {
                    id: 123,
                    value: ':Cost',
                    isSelected: false,
                  },
                ],
              },
            },
              {
                id: 's',
                parent:'111',
                isProductOption: true,
                code: 'Dom154Stter',
                name: 'Porche Steering',
                type: 'Product',
                isBundled: true,
                isDisableReconfiguration: false,
                groupId: '456',
                markup: 123,
                quantity: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'text/select/textarea/inputSelect',
                  selectValues: [
                    {
                      id: 123,
                      value: 'List',
                      isSelected: true,
                    },
                  ],
                },
                discountSchedule: {
                  id: 123,
                  name: 'Diwali',
                  discountUnit: 'Percent/Amount',
                  type: 'Range/Slab',
                  tiers: [
                    {
                      id: 123,
                      name: 'tier1',
                      lowerBound: 1,
                      upperBound: 10,
                      discountpercent: 10,
                      discountamount: 123,
                    },
                  ],
                },
                canClone: true,
                canSegment: true,
                isSegmented: true,
                segmentData: {
                  type: 'Yearly',
                  columns: [
                    {
                      name: 'Year 1',
                      quantity: 123,
                      listPrice: 123,
                      uplift: 123,
                      startDate: 'Date',
                      endDate: 'Date',
                      additionalDiscount: 123,
                      netunitPrice: 123,
                      netTotal: 123,
                    },
                  ],
                },
                canReconfigure: false,
                canShowDiscountScheduler: false,
                listPrice: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'text/select/textarea/inputSelect',
                  selectValues: [
                    {
                      id: 123,
                      value: 'List',
                      isSelected: true,
                    },
                  ],
                },
                isTaxable: true,
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'text/select/textarea/inputSelect',
                  selectValues: [
                    {
                      id: 123,
                      value: 'List',
                      isSelected: true,
                    },
                  ],
                },
                netUnitPrice: 123,
                totalPrice: 123,
                netTotal: 123,
                pricingMethod: {
                  values: [
                    {
                      id: 123,
                      value: 'List',
                      isSelected: true,
                    },
                    {
                      id: 123,
                      value: ':Cost',
                      isSelected: false,
                    },
                  ],
                },
              },
            ],
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: false,
            isSegmented: false,
            segmentData: null,
            canReconfigure: false,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '123ass',
            
            code: 'Car154',
            name: 'Ferrari',
            type: 'Product',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '456',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: false,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: false,
            isSegmented: false,
            segmentData: null,
            canReconfigure: false,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '222',
            code: 'Car3422',
            name: 'Lamborghini',
            type: 'Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '456',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            bundleProducts: [{
              id: '3453453',
              parent:'222',
              isProductOption: true,
              code: 'LAmbo154AC',
              name: 'Lambo AC',
              type: 'Product',
              isBundled: true,
              isDisableReconfiguration: false,
              groupId: '456',
              markup: 123,
              quantity: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              discountSchedule: {
                id: 123,
                name: 'Diwali',
                discountUnit: 'Percent/Amount',
                type: 'Range/Slab',
                tiers: [
                  {
                    id: 123,
                    name: 'tier1',
                    lowerBound: 1,
                    upperBound: 10,
                    discountpercent: 10,
                    discountamount: 123,
                  },
                ],
              },
              canClone: true,
              canSegment: true,
              isSegmented: true,
              segmentData: {
                type: 'Custom',
                columns: [
                  {
                    name: 'Custom',
                    quantity: 345,
                    listPrice: 3453453,
                    uplift: 345345,
                    startDate: 'Date',
                    endDate: 'Date',
                    additionalDiscount: 334534,
                    netunitPrice: 345345,
                    netTotal: 345333,
                  },
                  {
                    name: 'Custom 1',
                    quantity: 123,
                    listPrice: 123,
                    uplift: 123,
                    startDate: 'Date',
                    endDate: 'Date',
                    additionalDiscount: 123,
                    netunitPrice: 123,
                    netTotal: 1025,
                  },
                ],
              },
              canReconfigure: false,
              canShowDiscountScheduler: false,
              listPrice: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              isTaxable: true,
              additionalDiscount: {
                value: 123,
                isEditable: true,
                isVisible: true,
                dataType: 'text/select/textarea/inputSelect',
                selectValues: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                ],
              },
              netUnitPrice: 123,
              totalPrice: 123,
              netTotal: 123,
              pricingMethod: {
                values: [
                  {
                    id: 123,
                    value: 'List',
                    isSelected: true,
                  },
                  {
                    id: 123,
                    value: ':Cost',
                    isSelected: false,
                  },
                ],
              },
            }],
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: false,
            canSegment: true,
            isSegmented: false,
            segmentData: {
              type: 'Custom',
              columns: [
                {
                  name: 'Custom',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 7854,
                },
                {
                  name: 'Custom 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 45821,
                },
              ],
            },
            canReconfigure: false,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '333',
            code: 'Car348',
            name: 'Pagani',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '456',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: false,
            canSegment: true,
            isSegmented: false,
            segmentData: {
              type: 'Monthly',
              columns: [
                {
                  name: 'Month 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 54645,
                },
                {
                  name: 'Month 2',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 8970,
                },
                {
                  name: 'Month 3',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 45456,
                },
              ],
            },
            canReconfigure: false,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '444',
            code: 'Bike123',
            name: 'Ducatti',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '789',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Custom',
              columns: [
                {
                  name: 'Custom',
                  quantity: 123123,
                  listPrice: 12541,
                  uplift: 12541,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 12541,
                  netunitPrice: 12541,
                  netTotal: 12541,
                },
                {
                  name: 'Custom 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 4765,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '555',
            code: 'Bike489',
            name: 'Harley Davidson',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '789',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Custom',
              columns: [
                {
                  name: 'Custom',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 2345,
                },
                {
                  name: 'Custom 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 78967,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '666',
            code: 'Bike 121',
            name: 'BMW',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '789',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: false,
            segmentData: {
              type: 'Monthly',
              columns: [
                {
                  name: 'Month 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 6578,
                },
                {
                  name: 'Month 2',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 65786,
                },
                {
                  name: 'Month 3',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 65786,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '777',
            code: 'P121',
            name: 'Classic',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '789',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: false,
            segmentData: {
              type: 'Yearly',
              columns: [
                {
                  name: 'Year 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 56456,
                },
              ],
            },
            canReconfigure: false,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '888',
            code: 'Mob',
            name: 'Mobile',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: true,
            groupId: '123',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Yearly',
              columns: [
                {
                  name: 'Year 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 45645,
                },
              ],
            },
            canReconfigure: false,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '999',
            code: 'M123',
            name: 'Mobile Smart',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: true,
            groupId: '123',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Quaterly',
              columns: [
                {
                  name: 'Quater 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 5464,
                },
                {
                  name: 'Quater 2',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 456456,
                },
                {
                  name: 'Quater 3',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 456456,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '112',
            code: 'T132',
            name: 'Android',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '123',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: false,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Custom',
              columns: [
                {
                  name: 'Custom',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 4356456,
                },
                {
                  name: 'Custom 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 456456,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '113',
            code: 'Light254',
            name: 'LED',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '123',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: true,
            segmentData: {
              type: 'Monthly',
              columns: [
                {
                  name: 'Month 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
                {
                  name: 'Month 2',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
                {
                  name: 'Month 3',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
              ],
            },
            canReconfigure: true,
            canShowDiscountScheduler: false,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
          {
            id: '115',
            code: 'Cam325',
            name: 'Camera',
            type: 'Product/Bundle',
            isBundled: false,
            isDisableReconfiguration: false,
            groupId: '123',
            markup: 123,
            quantity: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            discountSchedule: {
              id: 123,
              name: 'Diwali',
              discountUnit: 'Percent/Amount',
              type: 'Range/Slab',
              tiers: [
                {
                  id: 123,
                  name: 'tier1',
                  lowerBound: 1,
                  upperBound: 10,
                  discountpercent: 10,
                  discountamount: 123,
                },
              ],
            },
            canClone: true,
            canSegment: true,
            isSegmented: false,
            segmentData: {
              type: 'Quaterly',
              columns: [
                {
                  name: 'Quater 1',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
                {
                  name: 'Quater 2',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
                {
                  name: 'Quater 3',
                  quantity: 123,
                  listPrice: 123,
                  uplift: 123,
                  startDate: 'Date',
                  endDate: 'Date',
                  additionalDiscount: 123,
                  netunitPrice: 123,
                  netTotal: 123,
                },
              ],
            },
            canReconfigure: false,
            canShowDiscountScheduler: true,
            listPrice: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            isTaxable: true,
            additionalDiscount: {
              value: 123,
              isEditable: true,
              isVisible: true,
              dataType: 'text/select/textarea/inputSelect',
              selectValues: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
              ],
            },
            netUnitPrice: 123,
            totalPrice: 123,
            netTotal: 123,
            pricingMethod: {
              values: [
                {
                  id: 123,
                  value: 'List',
                  isSelected: true,
                },
                {
                  id: 123,
                  value: ':Cost',
                  isSelected: false,
                },
              ],
            },
          },
        ],
        groups: [
          {
            id: '123',
            name: 'Group1',
            isOptional: true,
            description: 'longtext',
            additionaldiscount: 123,
            subscriptionTerm: 123,
            netTotal: 52000,
          },
          {
            id: '456',
            name: 'Group2',
            isOptional: true,
            description: 'longtext',
            additionaldiscount: 123,
            subscriptionTerm: 123,
            netTotal: 52000,
          },
          {
            id: '789',
            name: 'Group3',
            isOptional: true,
            description: 'longtext',
            additionaldiscount: 123,
            subscriptionTerm: 123,
            netTotal: 52000,
          },
        ],
      },
      config: {},
    };
    yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* getXrmData() {
  // Select username from store const requestURL =
  // 'https://esplsol.crm8.dynamics.com/api/data/v8.0/products?$select=name,produc
  // t num' +     'ber,standardcost,description,p2qes_quantityeditable'; const
  // requestURL = `${SERVER_URL +
  // EntityURLs.PRODUCTS}?$select=name,productnumber,standardcost,description,p2qe
  // s _quantityeditable`;
  try {
    const extendedQuery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='tr" +
        "ue'><entity name='product'><attribute name='name' /><attribute name='productid' " +
        "/><attribute name='productnumber' /><attribute name='description' /><attribute n" +
        "ame='statecode' /><attribute name='productstructure' /><order attribute='product" +
        "number' descending='false' /><filter type='and'><condition attribute='name' oper" +
        "ator='not-null' /><condition attribute='standardcost' operator='not-null' /><con" +
        "dition attribute='p2qes_quantityeditable' operator='not-null' /><condition attri" +
        "bute='description' operator='not-null' /></filter><link-entity name='productpric" +
        "elevel' from='productid' to='productid'><attribute name='amount' /><attribute na" +
        "me='pricingmethodcode' /><attribute name='pricelevelid' /><filter type='and'><co" +
        "ndition attribute='amount' operator='not-null' /><condition attribute='pricingme" +
        "thodcode' operator='not-null' /><condition attribute='pricelevelid' operator='eq" +
        "' uiname='Big billion day' uitype='pricelevel' value='{D3B8550E-7D6B-E711-812B-C" +
        "4346BDCAEF1}' /></filter></link-entity><link-entity name='productassociation' to" +
        "='productid' from='productid'><attribute name='associatedproduct' /></link-entit" +
        'y></entity></fetch>';
    const requestURL = `${SERVER_URL}/api/data/v8.0/${EntityURLs.PRODUCTS}?fetchXml=${extendedQuery}`;

    const headers = {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'OData-MaxVersion': '4.0',
        Prefer: 'odata.include-annotations="*"',
        'OData-Version': '4.0',
      },
    };

    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL, headers);
    yield put(xrmDataLoaded(repos.value));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* saveQuoteDetails(data) {
  try {
    const requestURL = 'http://localhost:3000/v1/quote/save/1';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const repos = yield call(request, requestURL, options);
    // yield put(dataLoaded(repos));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* calculateQuoteTotals(data) {
  try {
    const requestURL = 'http://localhost:3000/v1/quote/calculate/1';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const quotes = yield call(request, requestURL, options);
    yield put(dataLoaded(JSON.parse(quotes)));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

export function* CalculateQuotes() {
  const { data } = yield take(CALCULATE_SELECTED);
  yield call(calculateQuoteTotals, data);

  yield take(LOCATION_CHANGE);
}

export function* SaveQuotes() {
  const { data } = yield take(QUICK_SAVE_QUOTES);
  yield call(saveQuoteDetails, data);

  yield take(LOCATION_CHANGE);
}

// Individual exports for testing
export function* dataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_DATA, getData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* xrmDataSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(LOAD_XRM_DATA, getXrmData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default[dataSaga,
  xrmDataSaga,
  SaveQuotes,
  CalculateQuotes];
