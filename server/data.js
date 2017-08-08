const quotes = [{
  id: '1',
  name: 'Q-001',
  total: '123',
  priceBookId: '',
  lines: [
    {
      id: '1',
      code: 'Q121',
      name: 'Q-121',
      isBundle: true,
      groupId: '1',
      quantity: {
        value: '1',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      discountSchedule: {
        id: '1',
        name: 'Diwali',
        discountUnit: 'Percent',
        type: 'Range',
        tiers: [
          {
            id: '1',
            name: 'tier1',
            lowerBound: '0',
            upperBound: '1000',
            discountpercent: '10',
            discountamount: '123',
          }, {
            id: 2,
            name: 'tier2',
            lowerBound: '1001',
            upperBound: '5000',
            discountpercent: '15',
            discountamount: '123',
          }, {
            id: '3',
            name: 'tier3',
            lowerBound: '5001',
            upperBound: '10000',
            discountpercent: '20',
            discountamount: '123',
          },
        ],
      },
      canClone: true,
      canSegment: true,
      segmentData: {
        isCustom: true,
        columns: [
          {
            name: 'Dimension 1',
            quantity: '123',
            listPrice: '123',
            uplift: '123',
            startDate: 'Date',
            endDate: 'Date',
            additionalDiscount: '123',
            netunitPrice: '123',
            netTotal: '123',
          },
        ],
      },
      canReconfigure: true,
      canShowDiscountScheduler: true,
      listPrice: {
        value: '332',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      additionalDiscount: '0',
      markup: '123',
      netUnitPrice: '625.0061',
      totalPrice: '625.0061',
      netTotal: '625.0061',
      pricingMethod: {
        values: [
          {
            id: '1',
            value: ':Cash',
            isSelected: true,
          }, {
            id: '2',
            value: 'Netbanking',
            isSelected: false,
          },
        ],
      },
    }, {
      id: '2',
      code: 'Q122',
      name: 'Mobile',
      isBundle: true,
      groupId: '1',
      quantity: {
        value: '2',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      discountSchedule: {
        id: '1',
        name: 'Diwali',
        discountUnit: 'Percent',
        type: 'Range',
        tiers: [
          {
            id: '1',
            name: 'tier1',
            lowerBound: '0',
            upperBound: '1000',
            discountpercent: '10',
            discountamount: '123',
          }, {
            id: '2',
            name: 'tier2',
            lowerBound: '1001',
            upperBound: '5000',
            discountpercent: '15',
            discountamount: '123',
          }, {
            id: '3',
            name: 'tier3',
            lowerBound: '5001',
            upperBound: '10000',
            discountpercent: '20',
            discountamount: '123',
          },
        ],
      },
      canClone: true,
      canSegment: true,
      segmentData: {
        isCustom: true,
        columns: [
          {
            name: 'Dimension 1',
            quantity: '123',
            listPrice: '123',
            uplift: '123',
            startDate: 'Date',
            endDate: 'Date',
            additionalDiscount: '123',
            netunitPrice: '123',
            netTotal: '123',
          },
        ],
      },
      canReconfigure: true,
      canShowDiscountScheduler: true,
      listPrice: {
        value: '263',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      additionalDiscount: '10',
      markup: '123',
      netUnitPrice: '752.00',
      totalPrice: '1504.00',
      netTotal: '1353.6',
      pricingMethod: {
        values: [
          {
            id: '1',
            value: ':Cash',
            isSelected: true,
          }, {
            id: '2',
            value: 'Netbanking',
            isSelected: false,
          },
        ],
      },
    }, {
      id: '3',
      code: 'Q123',
      name: 'Travel and Bike Bundle',
      isBundle: true,
      groupId: '2',
      quantity: {
        value: '1',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      discountSchedule: {
        id: '2',
        name: 'Dusshera',
        discountUnit: 'Percent',
        type: 'Range',
        tiers: [
          {
            id: '4',
            name: 'tier1',
            lowerBound: '0',
            upperBound: '10000',
            discountpercent: '10',
            discountamount: '5000',
          }, {
            id: '5',
            name: 'tier2',
            lowerBound: '10001',
            upperBound: '50000',
            discountpercent: '15',
            discountamount: '6000',
          },
        ],
      },
      canClone: true,
      canSegment: true,
      segmentData: {
        isCustom: true,
        columns: [
          {
            name: 'Dimension 1',
            quantity: '123',
            listPrice: '123',
            uplift: '123',
            startDate: 'Date',
            endDate: 'Date',
            additionalDiscount: '123',
            netunitPrice: '123',
            netTotal: '123',
          },
        ],
      },
      canReconfigure: true,
      canShowDiscountScheduler: true,
      listPrice: {
        value: '100000',
        isEditable: true,
        isVisible: true,
        dataType: 'text',
      },
      additionalDiscount: '5',
      markup: '123',
      netUnitPrice: '990000',
      totalPrice: '990000',
      netTotal: '990000',
      pricingMethod: {
        values: [
          {
            id: '1',
            value: ':Cash',
            isSelected: true,
          }, {
            id: '2',
            value: 'Netbanking',
            isSelected: false,
          },
        ],
      },
    },
  ],
  groups: [
    {
      id: '1',
      name: 'Group1',
      isOptional: true,
      description: '',
      additionaldiscount: '10',
      subscriptionTerm: '2',
    },
  ],
}];

const config = {};

const quoteArray = {
  quotes,
  config,
};

module.exports = quoteArray;
