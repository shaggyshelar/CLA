const express = require('express');
const bodyParser = require('body-parser');
const quotes = require('./data');
// Create the express router object for Photos
const quoteRouter = express.Router();

quoteRouter.use(bodyParser.urlencoded({
  extended: true,
}));
quoteRouter.use(bodyParser.json());

// A GET to the root of a resource returns a list of that resource
quoteRouter.get('/:id', (req, res) => {
  // const quoteResponse = quotes.quotes.filter((item) => (parseInt(item.id, 10) === parseInt(req.params.id, 10)));
  // if (quoteResponse !== undefined) {
  //   const response = {};
  //   response.quotes = quoteResponse;
  //   response.config = quotes.config;
  //   console.log(quoteResponse);
  //   res.json(response);
  // } else {
  //   res.json({
  //     quote: {},
  //     config: quotes.config,
  //   });
  // }
  const response = {};
  response.quotes = {
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
  };
  response.config = {};
  return res.json(response);
});

// /v1/quote/validateCustomSegment
quoteRouter.post('/validateCustomSegment', (req, res) => {
  const requestBody = req.body;
  if (requestBody.dimension != null && requestBody.dimension !== undefined) {
    if (requestBody.dimension.id != null && requestBody.dimension.quoteId != null && requestBody.dimension.productId != null && requestBody.dimension.name != null && requestBody.dimension.segment != null && requestBody.dimension.segment.length > 0 &&
      requestBody.dimension.id !== '' && requestBody.dimension.quoteId !== '' && requestBody.dimension.productId !== '' && requestBody.dimension.name !== '' && requestBody.dimension.segment !== '' && requestBody.dimension.segment.length > 0) {
      res.json(req.body);
    } else {
      res.json({
        errorMessage: 'validation error',
      });
    }
  } else {
    res.json({
      errorMessage: 'validation error',
    });
  }
});

// /v1/quote/SavePriceBook
quoteRouter.post('/SavePriceBook', (req, res) => {
  if (req.body.quoteId !== '' && req.body.priceBookId !== '' && req.body.config !== undefined &&
    req.body.quoteId !== undefined && req.body.priceBookId !== undefined &&
    req.body.quoteId !== null && req.body.priceBookId !== null) {
    res.json(req.body);
  } else {
    res.json({
      errorMessage: 'validation error',
    });
  }
});

// /v1/quote/save/{QuoteID}
quoteRouter.post('/save/:QuoteID', (req, res) => {
  // req.params.QuoteID;
  quotes.quotes.push(req.body.quote);
  res.json(req.body);
});

quoteRouter.post('/calculate/:QuoteID', (req, res) => {
  // req.params.QuoteID;
  quotes.quotes.push(req.body.quote);
  res.json(req.body);
});


// A POST to the root of a resource should create a new object
quoteRouter.post('/', (req, res) => {
  res.json({
    PostCalled: true,
  });
});
// We specify a param in our path for the GET of a specific object
quoteRouter.get('/:id', (req, res) => {
  res.json({
    GetWithIDCalled: true,
  });
});
// Similar to the GET on an object, to update it we can PATCH
quoteRouter.patch('/:id', (req, res) => {
  res.json({
    PatchWithIDCalled: true,
  });
});
// Delete a specific object
quoteRouter.delete('/:id', (req, res) => {
  res.json({
    DeleteWithIDCalled: true,
  });
});


const routerConfig = {
  quoteRouter,
};

module.exports = routerConfig;
