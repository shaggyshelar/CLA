const express = require('express');

// Create the express router object for Photos
const productRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
productRouter.get('/', (req, res) => {
  // res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
  res.json(
    { products: [
      {
        _id: '596db79f58d3f94623033cd0',
        productCode: 'Tillman',
        productName: 'Bradley',
        listPrice: '$ 332.9494',
        productFamily: '',
        productDescription: '',
        netUnitPrice: '$ 625.0061',
        netTotal: '$ 25.9874',
        QUANTITY: 14.7428,
      },
      {
        _id: '596db79f34ec0f84605ca6a1',
        productCode: 'Hernandez',
        productName: 'Holman',
        listPrice: '$ 700.7878',
        productFamily: '',
        productDescription: '',
        netUnitPrice: '$ 506.595',
        netTotal: '$ 502.2979',
        QUANTITY: 50.8204,
      },
      {
        _id: '596db79f10b858fe71591077',
        productCode: 'Burch',
        productName: 'Collins',
        listPrice: '$ 964.9937',
        productFamily: '',
        productDescription: '',
        netUnitPrice: '$ 269.6924',
        netTotal: '$ 305.6421',
        QUANTITY: 47.5805,
      },
      {
        _id: '596db79f90613ebdf6dc2b7c',
        productCode: 'Coleman',
        productName: 'Hunter',
        listPrice: '$ 833.9739',
        productFamily: '',
        productDescription: '',
        netUnitPrice: '$ 942.7997',
        netTotal: '$ 72.1729',
        QUANTITY: 82.5088,
      },
      {
        _id: '596db79f94800616a15f5ed5',
        productCode: 'Lorene',
        productName: 'Brennan',
        listPrice: '$ 804.2955',
        productFamily: '',
        productDescription: '',
        netUnitPrice: '$ 121.7662',
        netTotal: '$ 487.7556',
        QUANTITY: 77.3144,
      },
    ],
      priceList: {},
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
