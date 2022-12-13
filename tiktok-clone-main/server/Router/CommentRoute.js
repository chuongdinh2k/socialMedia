const express = require('express');
const router = express.Router();
const commentController = require('../Controller/CommentController')

router.post('/post/:id', commentController.postComment)
router.post('/delete/:idVideo/:id', commentController.deleteComment)
router.get('/get-list-comment/:id', commentController.getListComment)

module.exports = router;