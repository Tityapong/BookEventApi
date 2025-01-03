const express = require('express');
const router = express.Router();
const {authorize} = require('../middleware/authorize')

const { postContact , getAllContact, deleteContact} = require('../controllers/contactController');

router.post('/contact', postContact);

// get all contact
router.get('/contact', authorize(['admin']), getAllContact);
//delete contact
router.delete('/contact/:contactId', authorize(['admin']), deleteContact);

module.exports = router;