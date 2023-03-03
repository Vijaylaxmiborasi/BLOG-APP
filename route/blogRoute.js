const express = require('express')
const route = express.Router();


const blogController = require('../controller/blogController')
const {upload} = require('../middleware/imageStorage')
const validation = require('../validation/blog/blogValidation')

route.post('/create_blog/:id',upload.single('blogImage'),validation.createBlogValidation,blogController.createBlog)
route.post('/blog_list', blogController.blogList)
route.post('/blog_likes/:id',blogController.blogLikes)
route.post('/search_blog',validation.searchBlogValidation,blogController.searchBlog)
route.post('/user_blog/:id', blogController.userBlog)
route.delete('/blog_del/:id', blogController.deleteblog)
route.patch('/blog_update/:id', blogController.updateBlog)

module.exports = route