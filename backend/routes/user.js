// Importation
const express = require('express');

// Importation du middleware/password et check-email
const password = require('../middleware/check-password');

const checkemail = require('../middleware/check-email');

// Importation du controllers/user.js
const userCtrl = require('../controllers/user');

// La fonction Router()
const router = express.Router();

// La route (endpoint) signup 
router.post('/signup', checkemail, password, userCtrl.signup);

// La route (endpoint) login 
router.post('/login', userCtrl.login);

// Exportation du module
module.exports = router;
