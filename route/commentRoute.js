const express = require('express')
const route = express.Router();

const commentController = require('../controller/commentController')

route.post('/new_comment/:userId/:blogId', commentController.newComment)

module.exports = route