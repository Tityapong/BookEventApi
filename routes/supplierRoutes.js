const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authorize } = require('../middleware/authorize');

// POST /supplier/services - Create a service (suppliers only)
router.post(
    '/services',
    authorize(['supplier']),  // Allow only 'supplier' role (case-insensitive)
    supplierController.createService
);

// GET /supplier/services - List own services (suppliers only)
router.get(
    '/services',
    authorize(['supplier']),  // Allow only 'supplier' role
    supplierController.listOwnServices
);

// PUT /supplier/services/:service_id - Update a service (suppliers only)
router.put(
    '/services/:service_id',
    authorize(['supplier']),  // Allow only 'supplier' role
    supplierController.updateService
);

// DELETE /supplier/services/:service_id - Delete a service (suppliers only)
router.delete(
    '/services/:service_id',
    authorize(['supplier']),  // Allow only 'supplier' role
    supplierController.deleteService
);

router.get('/services/total', authorize(['supplier']), supplierController.getTotalServices);
router.get('/bookings/pending', authorize(['supplier']), supplierController.getTotalPendingBookings);
// GET /supplier/all-services - List all services (publicly available)
router.get('/all-services', supplierController.listAllServices);
// GET /supplier/services/category/:category_name - List services by category name (publicly available)
router.get('/services/category/:category_name', supplierController.listServicesByCategory);


module.exports = router;
