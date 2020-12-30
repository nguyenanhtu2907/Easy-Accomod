const express = require('express')
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.restrictRegister, accountController.register);

router.post('/register', accountController.registerDB);

router.get('/login',accountController.restrictRegister, accountController.login);

router.post('/login', accountController.loginDB);

router.get('/logout', accountController.logout);

router.get('/get-info', accountController.getInfo);

router.put('/seen-message/:index', accountController.seenMessage);

router.get('/get-info/:id', accountController.getInfoById);

router.post('/submit-message', accountController.submitMessage);

router.post('/action-admin', accountController.restrictLogin, accountController.actionAdmin);

router.get('/:id/manage', accountController.restrictLogin, accountController.manageAdmin);

router.get('/:id/get-noti',accountController.restrictLogin, accountController.getNoti);

router.get('/:id/nav', accountController.profileNav);

router.get('/:id/edit', accountController.restrictLogin, accountController.editProfile);

router.post('/:id/edit', accountController.restrictLogin, accountController.editProfileDB);

router.get('/saved', accountController.restrictLogin, accountController.addToSavedList);

router.get('/:id', accountController.profile);


module.exports = router;