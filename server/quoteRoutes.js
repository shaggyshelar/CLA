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
  const quoteResponse = quotes.quotes.filter((item) => (parseInt(item.id, 10) === parseInt(req.params.id, 10)));
  if (quoteResponse !== undefined) {
    const response = {};
    response.quotes = quoteResponse;
    response.config = quotes.config;
    res.json(response);
  } else {
    res.json({
      quote: {},
      config: quotes.config,
    });
  }

  // if (req.params.id === 1) {
  //   res.json(quote);
  // } else {
  //   res.json({
  //     quote: {},
  //     config: {},
  //   });
  // }
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
