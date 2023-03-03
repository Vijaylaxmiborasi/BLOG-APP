const express = require('express');
const route = express.Router();

const userController = require('../controller/usercontroller')
const validation = require('../validation/userValidation/userValidation')
const auth = require('../middleware/auth_middleware')
const { upload } = require('../middleware/imageStorage')

route.post('/signup',upload.single('profilepic'),validation.registerUserValidation,userController.signUp)
route.post('/signin',userController.signIn)
route.post('/reset_password',  userController.resetPasswordEmail)
route.post('/forget_password/:id/:token', userController.userPasswordReset)

module.exports = route