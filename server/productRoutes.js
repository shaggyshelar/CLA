const express = require('express');

// Create the express router object for Photos
const productRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
productRouter.get('/countries', (req, res) => {
  // res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
  res.json(
    { products: [
      {
        _id: '596db79f58d3f94623033cd0',
        'PRODUCT CODE': 'Tillman',
        'PRODUCT NAME': 'Bradley',
        'LIST PRICE': '$ 332.9494',
        'PRODUCT FAMILY': '',
        'PRODUCT DESCRIPTION': '',
        'NET UNIT PRICE': '$ 625.0061',
        'NET TOTAL': '$ 25.9874',
        QUANTITY: 14.7428,
      },
      {
        _id: '596db79f34ec0f84605ca6a1',
        'PRODUCT CODE': 'Hernandez',
        'PRODUCT NAME': 'Holman',
        'LIST PRICE': '$ 700.7878',
        'PRODUCT FAMILY': '',
        'PRODUCT DESCRIPTION': '',
        'NET UNIT PRICE': '$ 506.595',
        'NET TOTAL': '$ 502.2979',
        QUANTITY: 50.8204,
      },
      {
        _id: '596db79f10b858fe71591077',
        'PRODUCT CODE': 'Burch',
        'PRODUCT NAME': 'Collins',
        'LIST PRICE': '$ 964.9937',
        'PRODUCT FAMILY': '',
        'PRODUCT DESCRIPTION': '',
        'NET UNIT PRICE': '$ 269.6924',
        'NET TOTAL': '$ 305.6421',
        QUANTITY: 47.5805,
      },
      {
        _id: '596db79f90613ebdf6dc2b7c',
        'PRODUCT CODE': 'Coleman',
        'PRODUCT NAME': 'Hunter',
        'LIST PRICE': '$ 833.9739',
        'PRODUCT FAMILY': '',
        'PRODUCT DESCRIPTION': '',
        'NET UNIT PRICE': '$ 942.7997',
        'NET TOTAL': '$ 72.1729',
        QUANTITY: 82.5088,
      },
      {
        _id: '596db79f94800616a15f5ed5',
        'PRODUCT CODE': 'Lorene',
        'PRODUCT NAME': 'Brennan',
        'LIST PRICE': '$ 804.2955',
        'PRODUCT FAMILY': '',
        'PRODUCT DESCRIPTION': '',
        'NET UNIT PRICE': '$ 121.7662',
        'NET TOTAL': '$ 487.7556',
        QUANTITY: 77.3144,
      },
    ],
      priceList: null,
    }

  );
});
// A POST to the root of a resource should create a new object
productRouter.post('/', (req, res) => {
  res.json({ PostCalled: true });
});
// We specify a param in our path for the GET of a specific object
productRouter.get('/:id', (req, res) => {
  res.json({ GetWithIDCalled: true });
});
// Similar to the GET on an object, to update it we can PATCH
productRouter.patch('/:id', (req, res) => {
  res.json({ PatchWithIDCalled: true });
});
// Delete a specific object
productRouter.delete('/:id', (req, res) => {
  res.json({ DeleteWithIDCalled: true });
});

const routerConfig = {
  productRouter,
};

module.exports = routerConfig;
