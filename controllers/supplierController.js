const db = require('../config/db');
const multer = require('multer');

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
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit of 2MB
    fileFilter,
}).array('images', 3); // Allow up to 3 images

// Create a service
const createService = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }

        const { category_id, name, description, price, size ,location} = req.body;
        const supplier_id = req.user.id; // User ID from authentication

        if (req.user.role !== 'Supplier') {
            return res.status(403).json({ message: 'Only suppliers can create services' });
        }

        // Generate image URLs
        const imagePaths = req.files.map(
            (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );

        const query = `
            INSERT INTO services (supplier_id, category_id, name, description, price, size, location, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            supplier_id,
            category_id,
            name,
            description,
            price,
            size,
            location,
            imagePaths.join(','), // Store as comma-separated string
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
                    images: imagePaths, // Return URLs
                },
            });
        });
    });
};


// List all services created by the authenticated supplier
const listOwnServices = (req, res) => {
    const supplier_id = req.user.id; // User ID from authentication

    if (req.user.role !== 'Supplier') {
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

        // Map images back to URLs
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

        // Map images back to URLs
        const services = results.map(service => ({
            ...service,
            images: service.image.split(',').map(image => `${req.protocol}://${req.get('host')}/${image}`),
        }));

        res.status(200).json({
            message: 'All services retrieved successfully',
            services,
        });
    });
};



// Update a service
const updateService = (req, res) => {
    // Upload images using multer
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }

        const { service_id } = req.params; // Get the service ID from the URL
        const { category_id, name, description, price, size ,location} = req.body; // Text fields from the form-data
        const supplier_id = req.user.id; // User ID from authentication

        if (req.user.role !== 'Supplier') {
            return res.status(403).json({ message: 'Only suppliers can update services' });
        }

        // Collect new image URLs if any images were uploaded
        const imagePaths = req.files.map(
            (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );

        // SQL query to update the service
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

    if (req.user.role !== 'Supplier') {
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

module.exports = {
    createService,
    listOwnServices,
    updateService,
    deleteService,
    listAllServices
};
