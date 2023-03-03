const commentModelSchema = require('../model/commentModelSchema');
const commentSchema = require('../model/commentModelSchema')

//api to add new comment to the blog

const newComment = async(req, res)=>{
  try { 
    const comment = await new commentModelSchema(req.body);
    comment.blogId=req.params.blogId
    comment.userId=req.params.userId
    await comment.populate({
        path : 'userId',
        select : 'Fullname profilePic'
    })
    await comment.save()
        res.status(201).json({
            success : 'success',
            saveComment : comment,
            message : 'Comment added successfully.'
        })
}catch(err){
    res.status(400).json({
        success : 'failure',
        message : 'Error occured '+ err.message
    })
}
}


module.exports = {
    newComment
}
