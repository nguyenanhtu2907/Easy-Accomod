const express = require('express')
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.register);

router.post('/register', accountController.registerDB);

router.get('/login', accountController.login);

router.post('/login', accountController.loginDB);

router.get('/logout', accountController.logout);

router.get('/get-info', accountController.getInfo);

router.get('/:id/manage',accountController.restrictLogin, accountController.manageAdmin);

router.get('/:id', accountController.profile);

module.exports = router;