const db = require('../config/db'); // Import the database connection



const getAllServiceCategories = (req, res) => {
    db.query('SELECT * FROM service_categories', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      res.status(200).json({
        message: 'Service categories retrieved successfully',
        categories: results,
      });
    });
  };
// Controller function to create a service category
const createServiceCategory = (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Category name is required' });
  }

  // Insert category into the database
  db.query(
    'INSERT INTO service_categories (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      res.status(201).json({
        message: 'Service category created successfully',
        category: { id: result.insertId, name },
      });
    }
  );
};


// Update a service category
const updateServiceCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    // Validate input
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }
  
    // Update category in the database
    db.query(
      'UPDATE service_categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Service category not found' });
        }
        res.status(200).json({
          message: 'Service category updated successfully',
          category: { id, name },
        });
      }
    );
  };


  // Delete a service category
const deleteServiceCategory = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM service_categories WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service category not found' });
      }
      res.status(200).json({ message: 'Service category deleted successfully' });
    });
  };

module.exports = { createServiceCategory , getAllServiceCategories , updateServiceCategory , deleteServiceCategory };
