const db = require('../config/db');
const multer = require('multer');
// const BASE_URL = process.env.BASE_URL || 'http://localhost:8000'; 

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit of 2MB per file
    fileFilter,
}).array('images', 3); // Allow up to 3 images

// Create a service
const createService = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }

        const { category_id, name, description, price, size, location } = req.body;
        const supplier_id = req.user.id; // User ID from authentication

        // Ensure the user has 'supplier' role
        if (req.user.role !== 'supplier') {
            return res.status(403).json({ message: 'Only suppliers can create services' });
        }

        // Generate image URLs
        const imagePaths = req.files.map(
            (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );

        const query = `
            INSERT INTO services (supplier_id, category_id, name, description, price, size, location, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            supplier_id,
            category_id,
            name,
            description,
            price,
            size,
            location,
            imagePaths.join(','), // Store images as a comma-separated string
        ];

        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err.message });
            }

            res.status(201).json({
                message: 'Service created successfully',
                service: {
                    id: results.insertId,
                    supplier_id,
                    category_id,
                    name,
                    description,
                    price,
                    size,
                    location,
                    images: imagePaths, // Return image URLs
                },
            });
        });
    });
};

// List services created by the authenticated supplier
const listOwnServices = (req, res) => {
    const supplier_id = req.user.id; // User ID from authentication

    if (req.user.role !== 'supplier') {
        return res.status(403).json({ message: 'Only suppliers can view their services' });
    }

    const query = `
        SELECT s.id, s.name, s.description, s.price, s.size, s.location, s.image, sc.name AS category_name 
        FROM services s
        JOIN service_categories sc ON s.category_id = sc.id
        WHERE s.supplier_id = ?
    `;

    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        // Map image paths to URLs
        const services = results.map(service => ({
            ...service,
            images: service.image.split(',').map(image => `${req.protocol}://${req.get('host')}/${image}`)
        }));

        res.status(200).json({
            message: 'Services retrieved successfully',
            services,
        });
    });
};

// List all services (publicly available)
const listAllServices = (req, res) => {
    const query = `
        SELECT 
            s.id, 
            s.name, 
            s.description, 
            s.price, 
            s.size, 
            s.location, 
            s.image, 
            u.name AS supplier_name,
            sc.name AS category_name
        FROM services s
        JOIN Users u ON s.supplier_id = u.id
        JOIN service_categories sc ON s.category_id = sc.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        // Map image paths to URLs
        const services = results.map(service => ({
            ...service,
            images: service.image.split(',').map(image => `${image}`)
        }));

        res.status(200).json({
            message: 'All services retrieved successfully',
            services,
        });
    });
};

// Update a service
const updateService = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }

        const { service_id } = req.params; // Get the service ID from the URL
        const { category_id, name, description, price, size, location } = req.body; // Fields from form
        const supplier_id = req.user.id; // User ID from authentication

        if (req.user.role !== 'supplier') {
            return res.status(403).json({ message: 'Only suppliers can update services' });
        }

        // Collect new image URLs if any images were uploaded
        const imagePaths = req.files.map(
            (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );

        const query = `
            UPDATE services
            SET 
                category_id = ?, 
                name = ?, 
                description = ?, 
                price = ?, 
                size = ?, 
                location = ?,
                image = ?
            WHERE id = ? AND supplier_id = ?
        `;
        const values = [
            category_id,
            name,
            description,
            price,
            size,
            location,
            imagePaths.join(','), // Update images as a comma-separated string
            service_id,
            supplier_id,
        ];

        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Service not found or not authorized to update' });
            }

            res.status(200).json({
                message: 'Service updated successfully',
                service: {
                    service_id,
                    category_id,
                    name,
                    description,
                    price,
                    size,
                    location,
                    images: imagePaths,
                },
            });
        });
    });
};

// Delete a service
const deleteService = (req, res) => {
    const { service_id } = req.params;
    const supplier_id = req.user.id; // User ID from authentication

    if (req.user.role !== 'supplier') {
        return res.status(403).json({ message: 'Only suppliers can delete services' });
    }

    const query = `
        DELETE FROM services WHERE id = ? AND supplier_id = ?
    `;

    db.query(query, [service_id, supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    });
};

const listServicesByCategory = (req, res) => {
    const { category_name } = req.params;  // Category name from the URL

    const normalizedCategoryName = category_name.trim().toLowerCase(); // Normalize category name

    const query = `
        SELECT s.id, s.name, s.description, s.price, s.size, s.location, s.image, sc.name AS category_name
        FROM services s
        JOIN service_categories sc ON s.category_id = sc.id
        WHERE LOWER(sc.name) = ?
    `;

    db.query(query, [normalizedCategoryName], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No services found in this category' });
        }

        // Map image paths to URLs
        const services = results.map(service => ({
            ...service,
            images: service.image.split(',').map(image => `${image}`)
        }));

        res.status(200).json({
            message: 'Services retrieved successfully',
            services,
        });
    });
};

const getTotalServices = (req, res) => {
    const supplier_id = req.user.id;

    const query = `
        SELECT COUNT(*) AS total_services
        FROM services
        WHERE supplier_id = ?
    `;

    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({
            message: 'Total services count retrieved successfully',
            total_services: results[0].total_services,
        });
    });
};


// Get Total Pending Bookings for Supplier
const getTotalPendingBookings = (req, res) => {
    const supplier_id = req.user.id;

    const query = `
        SELECT COUNT(*) AS total_pending_bookings
        FROM bookings
        WHERE status = 'Pending'
        AND service_id IN (
            SELECT id FROM services WHERE supplier_id = ?
        )
    `;

    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({
            message: 'Total pending bookings retrieved successfully',
            total_pending_bookings: results[0].total_pending_bookings,
        });
    });
};




// Get service details by ID
const  getServiceDetailById= (req, res) => {
    const { service_id } = req.params; // Extract service ID from URL parameters

    // Validate the service_id
    if (!service_id || isNaN(service_id)) {
        return res.status(400).json({
            message: 'Invalid service ID provided.',
        });
    }

    const query = `
        SELECT 
            s.id, 
            s.name, 
            s.description, 
            s.price, 
            s.size, 
            s.location, 
            s.image, 
            sc.name AS category_name,
            u.name AS supplier_name,
            u.email AS supplier_email,
            u.phone AS supplier_phone
        FROM services s
        JOIN service_categories sc ON s.category_id = sc.id
        JOIN Users u ON s.supplier_id = u.id
        WHERE s.id = ?
    `;

    db.query(query, [service_id], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        const service = results[0];

        // Handle image URLs
        const images = service.image
            ? service.image.split(',').map(image => `${req.protocol}://${req.get('host')}/uploads/${image.trim()}`)
            : [];

        res.status(200).json({
            message: 'Service details retrieved successfully.',
            service: {
                id: service.id,
                name: service.name,
                description: service.description,
                price: service.price,
                size: service.size,
                location: service.location,
                category: service.category_name,
                supplier: {
                    name: service.supplier_name,
                    email: service.supplier_email,
                    phone: service.supplier_phone,
                },
                images, // Array of image URLs
            },
        });
    });
};


module.exports = {
    createService,
    listOwnServices,
    updateService,
    deleteService,
    listAllServices,
    listServicesByCategory,
    getTotalServices,
    getTotalPendingBookings,
    getServiceDetailById
};
