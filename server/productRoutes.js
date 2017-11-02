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
        id: 'c9a9b317-86b9-e711-8131-c4346bdcdf81',
        code: 'Win_server',
        name: 'Win Server 2016',
        description: 'Windows Server 2016bring the innovation behind the worlds largest cloud data center to yours.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 50000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 50000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '62bf5e79-86b9-e711-8131-c4346bdcdf81',
        code: 'Win_DOS',
        name: 'MS DOS',
        description: 'MS-DOS is a non-graphical command line operating system derived from 86-DOS',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 4000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 4000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'e9ced9cd-86b9-e711-8131-c4346bdcdf81',
        code: 'Win_OS10',
        name: 'Win 10 Professional',
        description: 'Windows 10 Professional is a personal computer operating system developed and released by Microsoft as part of the Windows NT family of operating systems.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 15000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 15000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'cccfd2fd-86b9-e711-8131-c4346bdcdf81',
        code: 'Win_Off365',
        name: 'Office 365',
        description: 'New Office 365 provides the features which make it easy to create and work together.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 3600.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 3600.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '33f62133-87b9-e711-8131-c4346bdcdf81',
        code: 'Win_Off',
        name: 'MS Office 2016',
        description: 'Microsoft Office 2016 is an office suite of applications, servers, and services developed by Microsoft.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 4500.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 4500.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'e0d9c952-87b9-e711-8131-c4346bdcdf81',
        code: 'Win_Libre',
        name: 'Libre Office',
        description: 'LibreOffice is a free and open source office suite, a project of The Document Foundation. It was forked from OpenOffice.org in 2010, which was an open-sourced.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 20000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 20000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '9f072489-87b9-e711-8131-c4346bdcdf81',
        code: 'Win_SE',
        name: 'Security Essentials',
        description: 'Windows Defender is built into the latest versions of Windows and helps guard your PC against viruses and other malware. ',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 1000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 1000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '4ba2a655-88b9-e711-8131-c4346bdcdf81',
        code: 'Win_Cam',
        name: 'WebCam',
        description: 'A webcam is a video camera that feeds or streams its image in real time to or through a computer to a computer network.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 3000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 3000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '181b128e-88b9-e711-8131-c4346bdcdf81',
        code: 'Win_HS',
        name: 'Headset',
        description: 'A headset combines a headphone with a microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 0.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 0.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'a302782c-13ba-e711-8132-c4346bdcdf81',
        code: 'Win_PM',
        name: 'Win Product Maintenance',
        description: 'Maintenance activity refers to an application or process that helps maintain the health and performance of a Windows PC.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 1000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 1000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'e541f64d-44ba-e711-8132-c4346bdcdf81',
        code: 'Win_NA',
        name: 'Norton Antivirus',
        description: 'Norton provides award-winning antivirus and security software for your PC, Mac, and mobile devices. ',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 2000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 2000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '4264be79-44ba-e711-8132-c4346bdcdf81',
        code: 'Win_AF',
        name: 'Akmai Firewall',
        description: 'Protect against application-layer attacks with a WAF. A web application firewall (WAF) is an essential element in your defense against rapidly emerging web security threats.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 3000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 3000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '8f0c9d79-45ba-e711-8132-c4346bdcdf81',
        code: 'Win_Processor',
        name: 'Core i-7',
        description: '8th Gen Intel® Core i7 Processors',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 20000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 20000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '721452c1-45ba-e711-8132-c4346bdcdf81',
        code: 'HG6T77AA',
        name: 'HP - DDR3 (16GB)',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 14916.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 14916.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '383ab3da-45ba-e711-8132-c4346bdcdf81',
        code: 'Win_LS',
        name: 'LED Screen',
        description: 'The Best Quality of LED Screen in full HD resolution.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 15000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 15000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'bfe9fefb-45ba-e711-8132-c4346bdcdf81',
        code: 'Win_LTS',
        name: 'LED Touch Screen',
        description: ' IPS (In-Plane-Switching) is a technology for LCD displays that offers users wider viewing angles and bolder colors.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 18000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 18000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'fb349db2-45ba-e711-8132-c4346bdcdf81',
        code: 'H2P6SAA',
        name: 'HP - DDR3 (8GB)',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 10236.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 10236.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'adee20cd-46ba-e711-8132-c4346bdcdf81',
        code: 'Win_MsD',
        name: 'MS Dynamics',
        description: 'Microsoft Dynamics 365 consists of intelligent cloud application that unifies CRM and ERP capabilities to help you run your business end to end.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 50000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 50000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 2,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '1556123e-47ba-e711-8132-c4346bdcdf81',
        code: 'Win_LC',
        name: 'LAN Cable',
        description: 'A local area network (LAN) is a computer network that interconnects computers within a limited area.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 100.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'Block Pricing',
              isSelected: true,
              Amount: 100.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [
          {
            blockId: '823f2064-47ba-e711-8132-c4346bdcdf81',
            blockName: 'Block 1',
            LowerBound: 1,
            UpperBound: 10,
            Price: 100.0000,
          },
          {
            blockId: '015a4d77-47ba-e711-8132-c4346bdcdf81',
            blockName: 'Block 2',
            LowerBound: 11,
            UpperBound: 20,
            Price: 80.0000,
          },
          {
            blockId: '2223ed7f-47ba-e711-8132-c4346bdcdf81',
            blockName: 'Block 3',
            LowerBound: 21,
            UpperBound: null,
            Price: 50.0000,
          },
        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '8096c9a7-47ba-e711-8132-c4346bdcdf81',
        code: 'Win_NC',
        name: 'Router',
        description: 'A router is a networking device that forwards data packets between computer networks. Routers perform the traffic directing functions on the Internet.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 4000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 4000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 2,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'fefd176a-09bb-e711-8132-c4346bdcdf81',
        code: 'Win_eCPQ',
        name: 'E-CPQ',
        description: 'Configure Price Quote software is a term used in the business-to-business industry to describe software systems that help sellers quote complex and configurable products.',
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 200000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 200000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '76330fec-43be-e711-8132-c4346bdcdf81',
        code: 'Win_AMC',
        name: 'AMC',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 5000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 5000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'e917ae89-e1be-e711-8132-c4346bdcdf81',
        code: 'Win-Intellicus',
        name: 'Intellicus',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 10000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 10000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '1eba5ea4-e3be-e711-8132-c4346bdcdf81',
        code: 'Win-1year',
        name: '1 Year Warranty',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 10000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 10000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'a9c07615-e4be-e711-8132-c4346bdcdf81',
        code: 'Win-3year',
        name: '3 Year Warranty',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 20000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 20000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: 'a97ecf00-e5be-e711-8132-c4346bdcdf81',
        code: '663324B21',
        name: 'HP - DDR4 (8GB)',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 13583.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 13583.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '7e0c7125-e5be-e711-8132-c4346bdcdf81',
        code: '669324B70',
        name: 'HP - DDR4 (16GB)',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Product',
        isBundle: false,
        productStructure: 'Product',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 18916.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 18916.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
      {
        id: '1496ce5e-00bb-e711-8132-c4346bdcdf81',
        code: 'Win_HighPC',
        name: 'High Performance PC',
        description: null,
        parentId: null,
        parentName: null,
        type: 'Bundle',
        isBundle: true,
        productStructure: 'Bundle',
        isBundled: false,
        canClone: false,
        canSegment: false,
        canReconfigure: false,
        canShowDiscountScheduler: true,
        optional: false,
        taxable: false,
        isReconfigurationDisabled: false,
        currency: '?',
        quoteId: 'f91562f0-13ba-e711-8132-c4346bdcdf81',
        groupId: null,
        lineId: null,
        parentLineId: null,
        decimalsSupported: 2,
        defaultQuantity: 1.0000000000,
        quantity: {
          value: 1.0000000000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        listPrice: {
          value: 150000.0000,
          isEditable: false,
          isVisible: true,
          dataType: 'text',
          selectValues: [

          ],
        },
        pricingMethod: {
          value: [
            {
              id: '00000000-0000-0000-0000-000000000000',
              value: 'List',
              isSelected: true,
              Amount: 150000.0000,
              Percent: 0.0,
            },
          ],
        },
        priceListId: 'e171145c-86b9-e711-8131-c4346bdcdf81',
        discountSchedule: {
          id: '',
          name: null,
          discountUnit: null,
          type: null,
          tiers: [

          ],
        },
        decimalSupported: null,
        blockPrices: [

        ],
        subscriptionPricing: null,
        subscriptionTerm: 0,
        termDiscountLevel: 'Line',
        segmentData: null,
        additionalDiscount: {
          value: 0.0,
          isEditable: false,
          isVisible: false,
          dataType: 'inputSelect',
          selectValues: [
            {
              id: '11111',
              value: '%',
              isSelected: true,
            },
            {
              id: '22222',
              value: 'Amount',
              isSelected: true,
            },
          ],
        },
        markup: 0.0,
        netUnitPrice: 0.0,
        totalPrice: 0.0,
        netTotal: 0.0,
        featureId: null,
        categoryId: null,
        isDependent: false,
        isExclusion: false,
        dependentProductId: null,
        dependentBy: null,
        isSelected: true,
        isRequired: false,
        isDisable: false,
        optionLayout: null,
        categories: [

        ],
        features: [

        ],
        products: [

        ],
      },
    ],
    config: {

    },
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
productRouter.post('/ReconfigureProduct', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const data = {
    quote: {
      id: '1',
      name: 'Table Quote',
      netAmount: 15000,
      customerAmount: 123,
      paymentTerms: 123,
      priceBookId: '123',
      linesGrouped: true,
      expirationDate: 'Date',
      currency: '₹',
      isPrimary: true,
      type: 'Quote/Renewal/Amendement',
      lines: [
        {
          id: '111',
          code: 'Dom154',
          isBundled: false,
          parentLineId: null,
          isDeleted: false,
          name: 'Porche',
          type: 'Bundle',
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
            isEditable: false,
            isVisible: true,
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: true,
              },
            ],
          },
          netUnitPrice: 123,
          totalPrice: 123,
          netTotal: 123,
          segmentTotal: 123,
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
          parentId: '111',
          parentLineId: '111',
          parentName: 'Porche',
          id: '12456',
          isBundled: false,
          isDeleted: false,
          code: 'Dom154AC',
          name: 'Porche AC',
          type: 'Product',
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
                additionalDiscount: {
                  value: 44535,
                  isEditable: false,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
                additionalDiscount: {
                  value: 7657,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            isEditable: false,
            isVisible: true,
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: true,
              },
            ],
          },
          netUnitPrice: 123,
          totalPrice: 123,
          netTotal: 123,
          segmentTotal: 123,
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
          parentId: '111',
          parentLineId: '111',
          isDeleted: false,
          parentName: 'Porche',
          isBundled: true,
          code: 'Dom154Stter',
          name: 'Porche Steering',
          type: 'Product',
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: true,
              },
            ],
          },
          netUnitPrice: 123,
          totalPrice: 123,
          netTotal: 123,
          segmentTotal: 123,
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
          isDeleted: false,
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
            type: 'Custom',
            columns: [
              {
                name: 'Custom',
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 7854,
              },
              {
                name: 'Custom 1',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          id: '3453453',
          parentId: '222',
          parentLineId: '222',
          parentName: 'Lamborghini',
          isBundled: true,
          isDeleted: false,
          code: 'LAmbo154AC',
          name: 'Lambo AC',
          type: 'Product',
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 23243,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 345345,
                netTotal: 345333,
              },
              {
                name: 'Custom 1',
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 333,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 67567,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 54645,
              },
              {
                name: 'Month 2',
                quantity: 123,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 9889,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 8970,
              },
              {
                name: 'Month 3',
                quantity: 123,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: true,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: false,
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
          isDeleted: false,
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
                isDeleted: false,
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 2345,
              },
              {
                name: 'Custom 1',
                quantity: 123,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: true,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: false,
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
          isDeleted: false,
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
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 6578,
              },
              {
                name: 'Month 2',
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 65786,
              },
              {
                name: 'Month 4',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 5,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 5464,
              },
              {
                name: 'Quater 2',
                quantity: 6,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 6,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 456456,
              },
              {
                name: 'Quater 3',
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 7,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          productId: '111',
          name: 'Android',
          type: 'Product/Bundle',
          isBundled: false,
          isDeleted: false,
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
                isDefault: true,
                quantity: 123,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 4356456,
              },
              {
                name: 'Custom 1',
                isDefault: false,
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 2',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 5',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 6',
                isDeleted: false,
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 7',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 8',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 111,
              },
              {
                name: 'Month 121',
                quantity: 123,
                listPrice: 123,
                isDeleted: false,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 9',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 10',
                quantity: 123,
                isDeleted: true,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 11',
                isDeleted: true,
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 12',
                quantity: 123,
                isDeleted: true,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Month 13',
                quantity: 1231,
                isDeleted: true,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: false,
              },
              {
                id: '124',
                value: 'INR',
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
          isDeleted: false,
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
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Quater 2',
                quantity: 123,
                listPrice: 123,
                uplift: 123,
                isDeleted: false,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
                netunitPrice: 123,
                netTotal: 123,
              },
              {
                name: 'Quater 3',
                quantity: 123,
                isDeleted: false,
                listPrice: 123,
                uplift: 123,
                startDate: 'Date',
                endDate: 'Date',
                additionalDiscount: {
                  value: 123,
                  isEditable: true,
                  isVisible: true,
                  dataType: 'select',
                  selectValues: [
                    {
                      id: '123',
                      value: '%',
                      isSelected: false,
                    },
                    {
                      id: '124',
                      value: 'INR',
                      isSelected: true,
                    },
                  ],
                },
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
            dataType: 'select',
            selectValues: [
              {
                id: '123',
                value: '%',
                isSelected: true,
              },
              {
                id: '124',
                value: 'INR',
                isSelected: false,
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
          name: 'Group A',
          isOptional: true,
          isDeleted: false,
          description: 'longtext',
          additionaldiscount: 123,
          subscriptionTerm: 123,
          netTotal: 52000,
        },
        {
          id: '456',
          name: 'Group B',
          isDeleted: false,
          isOptional: true,
          description: 'longtext',
          additionaldiscount: 123,
          subscriptionTerm: 123,
          netTotal: 52000,
        },
        {
          id: '789',
          name: 'Group C',
          isDeleted: false,
          isOptional: true,
          description: 'longtext',
          additionaldiscount: 123,
          subscriptionTerm: 123,
          netTotal: 52000,
        },
      ],
    },
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
          isBundled: true,
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
            value: 45965896,
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
          isBundled: true,
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
  const quoteProductData = {
    quoteProductData: data,
  };
  return res.json(quoteProductData);
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
