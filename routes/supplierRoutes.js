const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authorize } = require('../middleware/authorize');
const upload = require("../middleware/upload"); 
// POST /supplier/services - Create a service (suppliers only)
router.post(
    "/services",
    authorize(["supplier"]), // Allow only 'supplier' role
    upload.array("images", 3), // Handle up to 3 images
    supplierController.createService
);
// GET /supplier/services - List own services (suppliers only)
router.get(
    '/services',
    authorize(['supplier']),  // Allow only 'supplier' role
    supplierController.listOwnServices
);

// Update a service
router.put(
    '/services/:service_id',
    authorize(['supplier']),
    upload.array("images", 3), // Allow image updates
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

  // GET /supplier/services/:service_id - Get service details by ID (publicly available)
router.get('/services/:service_id', supplierController.getServiceDetailById);



module.exports = router;
