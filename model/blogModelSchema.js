const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    blogLikes: {
        type: Number,
        default : 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref : 'user'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
})

blogSchema.set('timestamps', true)
module.exports = mongoose.model('blog', blogSchema)
