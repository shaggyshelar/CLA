const express = require('express');

// Create the express router object for Photos
const serverRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
serverRouter.get('/', (req, res) => {
  // res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
  res.json(
    [
      {
        _id: '596db79f58d3f94623033cd0',
        'PRODUCT CODE': 'Tillman',
        'PRODUCT NAME': 'Bradley',
        'LIST UNIT PRICE': '$ 332.9494',
        balance: '$2,234.27',
        'ADDITIONAL DISC.': '',
        'NET UNIT PRICE': '$ 625.0061',
        'NET TOTAL': '$ 25.9874',
        QUANTITY: 14.7428,
      },
      {
        _id: '596db79f34ec0f84605ca6a1',
        'PRODUCT CODE': 'Hernandez',
        'PRODUCT NAME': 'Holman',
        'LIST UNIT PRICE': '$ 700.7878',
        balance: '$2,407.24',
        'ADDITIONAL DISC.': '',
        'NET UNIT PRICE': '$ 506.595',
        'NET TOTAL': '$ 502.2979',
        QUANTITY: 50.8204,
      },
      {
        _id: '596db79f10b858fe71591077',
        'PRODUCT CODE': 'Burch',
        'PRODUCT NAME': 'Collins',
        'LIST UNIT PRICE': '$ 964.9937',
        balance: '$2,023.00',
        'ADDITIONAL DISC.': '',
        'NET UNIT PRICE': '$ 269.6924',
        'NET TOTAL': '$ 305.6421',
        QUANTITY: 47.5805,
      },
      {
        _id: '596db79f90613ebdf6dc2b7c',
        'PRODUCT CODE': 'Coleman',
        'PRODUCT NAME': 'Hunter',
        'LIST UNIT PRICE': '$ 833.9739',
        balance: '$2,644.06',
        'ADDITIONAL DISC.': '',
        'NET UNIT PRICE': '$ 942.7997',
        'NET TOTAL': '$ 72.1729',
        QUANTITY: 82.5088,
      },
      {
        _id: '596db79f94800616a15f5ed5',
        'PRODUCT CODE': 'Lorene',
        'PRODUCT NAME': 'Brennan',
        'LIST UNIT PRICE': '$ 804.2955',
        balance: '$1,677.35',
        'ADDITIONAL DISC.': '',
        'NET UNIT PRICE': '$ 121.7662',
        'NET TOTAL': '$ 487.7556',
        QUANTITY: 77.3144,
      },
    ]
  );
});
// A POST to the root of a resource should create a new object
serverRouter.post('/', (req, res) => {
  res.json({ PostCalled: true });
});
// We specify a param in our path for the GET of a specific object
serverRouter.get('/:id', (req, res) => {
  res.json({ GetWithIDCalled: true });
});
// Similar to the GET on an object, to update it we can PATCH
serverRouter.patch('/:id', (req, res) => {
  res.json({ PatchWithIDCalled: true });
});
// Delete a specific object
serverRouter.delete('/:id', (req, res) => {
  res.json({ DeleteWithIDCalled: true });
});

const routerConfig = {
  serverRouter,
};

module.exports = routerConfig;
