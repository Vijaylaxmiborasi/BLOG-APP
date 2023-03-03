const express = require('express')
const route = express.Router()

const userRoute = require('./userRoute')
const blogRoute = require('./blogRoute')
const commentRoute = require('./commentRoute')
 
route.use('/user', userRoute)
route.use('/blog', blogRoute)
route.use('/comment', commentRoute)

module.exports = route