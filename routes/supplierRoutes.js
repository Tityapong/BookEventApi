const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authorize } = require('../middleware/authorize');

// POST /supplier/services - Create a service (suppliers only)
router.post(
    '/services',
    authorize(['Supplier']), // Allow only 'Supplier' role
    supplierController.createService
);


// GET /supplier/services - List own services
router.get('/services', authorize(['Supplier']), supplierController.listOwnServices);

// PUT /supplier/services/:service_id - Update a service
router.put('/services/:service_id', authorize(['Supplier']), supplierController.updateService);

// DELETE /supplier/services/:service_id - Delete a service
router.delete('/services/:service_id', authorize(['Supplier']), supplierController.deleteService);

module.exports = router;
