const express = require('express')
const router = express.Router();

const AccountController = require('../controllers/AccountController');

router.get('/register', AccountController.register);

router.post('/register', AccountController.registerDB);

router.get('/login', AccountController.login);

router.post('/login', AccountController.loginDB);

router.get('/:id', AccountController.profile);

module.exports = router;