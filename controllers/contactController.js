const db = require('../config/db')

const postContact = (req, res) => {
    const { name, email, message } = req.body;

    db.query('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(200).json({ message: 'Message sent successfully' });
    });
};
// getallContact
const getAllContact = (req, res) => {
    db.query('SELECT * FROM contact', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(200).json({ message: 'All messages retrieved successfully', contact: result });
    });
};
//delete
const deleteContact = (req, res) => {
    const { contactId } = req.params;

    db.query('DELETE FROM contact WHERE id =?', [contactId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    });
};
module.exports = { postContact , getAllContact ,deleteContact }