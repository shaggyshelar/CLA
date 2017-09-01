const express = require('express');

// Create the express router object for Photos
const productRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
productRouter.get('/', (req, res) => {
  // res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.json({
    products: [
      {
        id: '123',
        code: 'P121',
        name: 'abcd',
        isSegmented: false,
        type: 'Product',
        isBundled: true,
        isDisableReconfiguration: true,
        groupId: 123,
        markup: 123,
        quantity: {
          value: 123,
          isEditable: true,
          isVisible: true,
          dataType: 'text/select/textarea/inputSelect',
          selectValues: [
            {
              id: 123,
              value: ':List',
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
        segmentData: null,
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
              value: ':List',
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
              value: ':List',
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
              value: ':List',
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
        id: '1234',
        isSegmented: false,
        code: 'P121',
        name: 'xyz',
        type: 'Product',
        isBundled: true,
        isDisableReconfiguration: true,
        groupId: 123,
        markup: 123,
        quantity: {
          value: 123,
          isEditable: true,
          isVisible: true,
          dataType: 'text/select/textarea/inputSelect',
          selectValues: [
            {
              id: 123,
              value: ':List',
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
        segmentData: null,
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
              value: ':List',
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
              value: ':List',
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
              value: ':List',
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
        id: '1235',
        code: 'P121',
        isSegmented: false,
        name: 'pqr',
        type: 'Product/Bundle',
        isBundled: true,
        isDisableReconfiguration: true,
        groupId: 123,
        markup: 123,
        quantity: {
          value: 123,
          isEditable: true,
          isVisible: true,
          dataType: 'text/select/textarea/inputSelect',
          selectValues: [
            {
              id: 123,
              value: ':List',
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
        segmentData: null,
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
              value: ':List',
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
              value: ':List',
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
              value: ':List',
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
    config: {},
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
