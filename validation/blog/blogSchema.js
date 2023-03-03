const joi = require('@hapi/joi')
const { searchBlog } = require('../../controller/blogController')

const schema = {
    createBlog : joi.object({
        blogTitle : joi.string().max(20).message({
            'string.max' : '{#label} length must be less or equal to {#limit} characters long.'
        }).required(),
        blogDescription : joi.string().max(100).message({
            'string.max' : '{#label} length must be less or equal to {#limit} characters long.'
        }).required()
    }).unknown(true),

    findBlog : joi.object({
        blogTitle : joi.string().min(1).message({
            'string.min' : '{#label} is not allowed to be empty.'
        }).required()
    }).unknown(true)
}

module.exports = schema