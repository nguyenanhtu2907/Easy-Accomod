const express = require('express')
const router = express.Router();

const postController = require('../controllers/PostController');
const accountController = require('../controllers/AccountController');

router.get('/create', accountController.restrictLogin, postController.createPost)

router.post('/create', postController.createPostDB)

router.get('/search', postController.searchResult)

router.get('/get-info', postController.getInfo)

module.exports = router;