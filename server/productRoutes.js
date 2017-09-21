const express = require('express');
const _ = require('lodash');
// Create the express router object for Photos
const productRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
productRouter.get('/GetProducts', (req, res) => {
  // res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const productData = {
    products: [
      {
        id: '123',
        code: 'P121',
        name: 'Car',
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
          value: 8959,
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
        code: 'car12',
        name: 'car2',
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
          value: 635,
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
        code: 'car3',
        isSegmented: false,
        name: 'car',
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
          value: 85225123,
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
  };

  if (req.query.SearchValue) {
    productData.products = _.filter(productData.products, (user) => user.name.includes(req.query.SearchValue));
  }
  res.json(productData);
});
productRouter.get('/AddOptions', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const productsData = {
    products: [
      {
        id: '123353345',
        code: 'P758',
        name: 'pqrst',
        featureId: '123',
        categoryId: '123',
              // categoryId: null,
        isDependent: false,
        isSelected: false,
        isRequired: true,
        isDisable: false,
        isExclusion: false,
        // isDeleted: false,
        optionSelectionMethod: 123,
        optionLayout: 'wizard/section/tab',
        quantity: {
          value: 890,
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
      },
      {
        id: '2349797897',
        code: 'qw2342',
        name: 'wyyyr',
        featureId: '123',
        categoryId: '456',
        isDependent: true,
        isExclusion: false,
        dependentBy: 'pqrst',
        dependentProductId: '123353345',
        isSelected: false,
        isRequired: false,
        isDisable: true,
        optionSelectionMethod: 456,
        optionLayout: 'wizard/section/tab',
        quantity: {
          value: 565,
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
        listPrice: {
          value: 654,
          isEditable: true,
          isVisible: true,
          dataType: 'text/select/textarea/inputSelect',
          selectValues: [
            {
              id: 554,
              value: ':List',
              isSelected: true,
            },
          ],
        },
      },
      {
        id: '9801791',
        code: 'nmbnfdgq',
        name: 'qwerfghdfh',
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: true,
        dependentBy: 'fkfhjkhj',
        dependentProductId: '980179',
        isSelected: false,
        isRequired: false,
        isDisable: false,
          // isDeleted: false,
        optionSelectionMethod: 456,
        optionLayout: 'wizard/section/tab',
        quantity: {
          value: 565,
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
        listPrice: {
          value: 654,
          isEditable: true,
          isVisible: true,
          dataType: 'text/select/textarea/inputSelect',
          selectValues: [
            {
              id: 554,
              value: ':List',
              isSelected: true,
            },
          ],
        },
      },
    ],
    config: {},
  };
  return res.json(productsData);
});
productRouter.get('/ReconfigureProduct', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const productBundleData = {
    productBundle: {
      id: '1',
      quoteId: '123',
      lineId: '1234567',
      quoteName: 'Q-00163',
      name: 'Meal',
      products: [
        {
          id: '12311',
          code: 'P121',
          name: 'ABCD',
          featureId: '123',
          categoryId: '123',
           // categoryId: null,
          isDependent: true,
          isSelected: true,
          isRequired: false,
          dependentProductId: '145',
          // isDeleted: false,
          optionSelectionMethod: 123,
          optionLayout: 'wizard/section/tab',
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
        },
        {
          id: '234',
          code: 'P122sds',
          name: 'EFGHfsadfad',
          featureId: '456',
          categoryId: '456',
          dependentBy: 'EFGH',
            // categoryId: null,
          isDependent: true,
          dependentProductId: '145',
          isDisable: true,
          isSelected: false,
          isRequired: false,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '145',
          code: 'P122',
          name: 'EFGH',
          featureId: '789',
          categoryId: '456',
            // featureId: null,
           // categoryId: null,
          isDependent: false,
          isDisable: false,
          isSelected: false,
          isRequired: false,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '1451',
          code: 'QPP122',
          name: 'WRTYU',
          featureId: '789',
          categoryId: '456',
            // featureId: null,
           // categoryId: null,
          isDependent: true,
          dependentProductId: '145',
          dependentBy: 'EFGH',
          isSelected: false,
          isRequired: false,
          isDisable: true,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '980',
          code: 'P122dfgsad',
          name: 'EFGHgsdfg',
          featureId: null,
            // featureId: 789,
           // categoryId: 456,
          categoryId: null,
          isDependent: true,
          isSelected: true,
          isRequired: true,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '9801',
          code: 'ghjggghjg',
          name: 'cbxcvbvb',
          featureId: '7897',
          categoryId: null,
          isDependent: true,
          isSelected: false,
          isRequired: true,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '98016',
          code: 'nynhyvrrv',
          name: 'n6n6y6vrr',
          featureId: '1237',
          categoryId: null,
          isDependent: true,
          isExclusion: true,
          dependentBy: 'plmook',
          dependentProductId: '98017',
          isDisable: false,
          isSelected: false,
          isRequired: false,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '98017',
          code: 'plplin',
          name: 'plmook',
          featureId: '1237',
          categoryId: null,
          isDependent: false,
          isExclusion: true,
          dependentBy: 'n6n6y6vrr',
          dependentProductId: '98016',
          isSelected: false,
          isRequired: false,
          isDisable: false,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },
        {
          id: '980179',
          code: 'youiouio',
          name: 'fkfhjkhj',
          featureId: '1237',
          categoryId: null,
          isDependent: false,
          isExclusion: true,
          dependentBy: 'qwerfghdfh',
          dependentProductId: '9801791',
          isSelected: false,
          isRequired: false,
          isDisable: false,
          // isDeleted: false,
          optionSelectionMethod: 456,
          optionLayout: 'wizard/section/tab',
          quantity: {
            value: 565,
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
          listPrice: {
            value: 654,
            isEditable: true,
            isVisible: true,
            dataType: 'text/select/textarea/inputSelect',
            selectValues: [
              {
                id: 554,
                value: ':List',
                isSelected: true,
              },
            ],
          },
        },

      ],
      categories: [
        {
          id: '123',
          name: 'Hardware',
        },
        {
          id: '456',
          name: 'Software',
        },
      ],
      features: [
        {
          id: '123',
          categoryId: '123',
          //  categoryId: null,
          name: 'Drinks',
          dynamicAddEnabled: true,
          minOption: 1,
          maxOption: 2,
        },
        {
          id: '1237',
          categoryId: '123',
          //  categoryId: null,
          name: 'Exclusion',
          dynamicAddEnabled: false,
        },
        {
          id: '456',
          categoryId: '456',
           // categoryId: null,
          name: 'Mc Meal',
          dynamicAddEnabled: false,
        },
        {
          id: '789',
          categoryId: '456',
            // categoryId: null,
          name: 'Soft Drinks',
          dynamicAddEnabled: false,
        },
        {
          id: '7897',
            // categoryId: null,
          name: 'Meal',
          dynamicAddEnabled: true,
        },
      ],
    },
    config: {},
  };
  return res.json(productBundleData);
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
