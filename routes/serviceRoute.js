const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authorize'); // Import role-based middleware
const { createServiceCategory , getAllServiceCategories , updateServiceCategory , deleteServiceCategory } = require('../controllers/serviceController');


router.get('/admin/service-categories', authorize(['Admin']), getAllServiceCategories);
// POST route: Create a service category (Admin only)
router.post('/admin/service-categories', authorize(['Admin']), createServiceCategory);


// PUT route: Update a service category (Admin only)
router.put('/admin/service-categories/:id', authorize(['Admin']), updateServiceCategory);

// DELETE route: Delete a service category (Admin only)
router.delete('/admin/service-categories/:id', authorize(['Admin']), deleteServiceCategory);

module.exports = router;
