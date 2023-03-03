const blog = require('./blogSchema')

module.exports = {
    createBlogValidation : async(req, res, next)=>{
        const value = await blog.createBlog.validate(req.body, {abortEarly : false})
        if(value.error){
            res.json({
                success : 0,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    },

    searchBlogValidation : async(req, res, next)=>{
        const value = await blog.findBlog.validate(req.body, {abortEarly : false})
        if(value.error){
            res.json({
                success : 0,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}