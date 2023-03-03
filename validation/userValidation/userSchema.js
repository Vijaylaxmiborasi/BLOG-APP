const joi = require('@hapi/joi')
const {joiPasswordExtendCore} = require('joi-password')
const joiPassword = joi.extend(joiPasswordExtendCore)

const schema = {
    registerUser : joi.object({
        fullName : joi.string().max(20).message({
            'string.max' : '{#label}length must be less than or equal to {#limit} characters long'
        }).required(),
        userEmail : joi.string().email().required(),
        city : joi.string().required(),
        phoneNo : joi.number().integer().min(1000000000).max(9999999999).message('Invalid phone number.').required(),
        address : joi.string().required(),
    password : joiPassword.string().minOfUppercase(1).minOfLowercase(1).minOfSpecialCharacters(1).minOfNumeric(1).noWhiteSpaces().message({
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters':
                '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces', 
            })
        .required(),
    })
}

module.exports = schema