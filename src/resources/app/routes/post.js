const express = require('express')
const router = express.Router();

const postController = require('../controllers/PostController');
const accountController = require('../controllers/AccountController');

router.get('/create', accountController.restrictLogin, postController.createPost)

router.post('/create', postController.createPostDB)


router.get('/search', postController.search)

router.get('/searchResult', postController.searchResult)

router.get('/get-info', postController.getInfo)

router.get('/saved', postController.modifySaved)

router.get('/:slug/edit', postController.editPost)

router.post('/:slug/edit', postController.editPostDB)

router.post('/:slug/add-comment', postController.addComment)

router.get('/:slug/report', postController.reportPost)

router.get('/:slug/extend', postController.extendPost)

router.get('/:slug', postController.postDetail)

module.exports = router;