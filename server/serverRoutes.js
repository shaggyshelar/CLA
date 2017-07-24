const express = require('express');

// Create the express router object for Photos
const quoteRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
quoteRouter.get('/', (req, res) => {
  res.json({ FirstName: 'Sagar122', LastName: 'Shelar444' });
});
// A POST to the root of a resource should create a new object
quoteRouter.post('/', (req, res) => {
  res.json({ PostCalled: true });
});
// We specify a param in our path for the GET of a specific object
quoteRouter.get('/:id', (req, res) => {
  res.json({ GetWithIDCalled: true });
});
// Similar to the GET on an object, to update it we can PATCH
quoteRouter.patch('/:id', (req, res) => {
  res.json({ PatchWithIDCalled: true });
});
// Delete a specific object
quoteRouter.delete('/:id', (req, res) => {
  res.json({ DeleteWithIDCalled: true });
});

const routerConfig = {
  quoteRouter,
};

module.exports = routerConfig;
