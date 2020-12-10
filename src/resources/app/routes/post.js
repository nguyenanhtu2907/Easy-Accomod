const express = require('express')
const router = express.Router();

const postController = require('../controllers/PostController');

router.get('/search', postController.searchResult)

router.get('/get-info', postController.getInfo)

module.exports = router;