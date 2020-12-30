const express = require('express')
const router = express.Router();

const postController = require('../controllers/PostController');
const accountController = require('../controllers/AccountController');

router.get('/create', accountController.restrictLogin, postController.createPost)

router.post('/create', postController.createPostDB)


router.get('/search', postController.search)

router.get('/searchResult', postController.searchResult)

router.get('/get-info', postController.getInfo)

router.get('/saved',accountController.restrictLogin, postController.modifySaved)

router.get('/:slug/edit',accountController.restrictLogin, postController.editPost)

router.post('/:slug/edit',accountController.restrictLogin, postController.editPostDB)

router.post('/:slug/add-comment',accountController.restrictLogin, postController.addComment)

router.get('/:slug/report',accountController.restrictLogin, postController.reportPost)

router.get('/:slug/extend',accountController.restrictLogin, postController.extendPost)

router.get('/:slug/delete',accountController.restrictLogin, postController.deletePost)

router.get('/:slug', postController.postDetail)

module.exports = router;