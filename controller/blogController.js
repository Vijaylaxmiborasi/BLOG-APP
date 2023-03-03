const blogSchema = require('../model/blogModelSchema')

// add blog
const createBlog = async (req, res) => {
    try {
        const blogDetail = new blogSchema(req.body);
        blogDetail.userId = req.params.id;
        const filePath = `/upload/${req.file.filename}`;
        blogDetail.blogImage = filePath;
        await blogDetail.save();
        res.status(201).json({
            success: 'success',
            blog: blogDetail,
            message: 'Blog is created'
        })
    }
    catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'Error occured' + err.message
        })
    }
}

const blogList = async (req, res) => {
    try {
        const blogList = await blogSchema.find();
        res.status(200).json({
            success: 'success',
            blogList: blogList
        })
    } catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'Error occured ' + err.message
        })
    }
}

const blogLikes = async (req, res) => {
    try {
        const { blogLikes } = req.body;
        const blog = await blogSchema.findById      (req.params.id);
        if (blog != null) {
            if (blogLikes === 'true') {
                await blog.updateOne({$set: {blogLikes: ++blog.blogLikes } });
                res.status(202).json({
                    success: 'success',
                    message: 'You liked the blog',
                    likedBlog: blog.blogLikes
                });
            }
            else {
                await blog.updateOne({ $set: { blogLikes: --blog.blogLikes } })
                res.status(201).json({
                    success: 'failure',
                    message: 'You unliked the blog',
                    likedBlog: blog.blogLikes
                })
            }
        } else {
            res.status(404).json({
                success: 'failure',
                message: "Blog not found."
            });
        }
    } catch (err) {
        res.status(400).json({
            success: 'failure',
            error: 'Error occured' + err.message
        })
    }
}

const searchBlog = async (req, res) => {
    const blogTitle = req.body.blogTitle;
    try {
        const query = { blogTitle: { $regex: blogTitle, $options: "i" } }
        const blogData = await blogSchema.find(query)
        if (blogData) {
            res.status(201).json({
                success: 'success',
                blogDetail: blogData
            })
        } else {
            res.status(404).json({
                success: 'success',
                message: 'No blog found, registered with this title.'
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'Error occured : ' + err.message
        })
    }
}

const userBlog = async (req, res) => {
    const userId = req.params.id;
    try {
        const myBlog = await blogSchema.find({ userId: userId }).populate({
            path: 'userId',
            select: "fullName"
        })
        res.status(200).json({
            success: 'success',
            blogDetail: myBlog,

        })
    } catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'Error occured' + err.message
        })
    }
}

const deleteblog = async (req, res) => {
    try {
        await blogSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: 'success',
            message: 'Blog deleted successfully.'
        })
    } catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'error occured' + err.message
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        await blogSchema.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({
            success: 'success',
            message: 'Blog updated successfully.'
        })
    } catch (err) {
        res.status(400).json({
            success: 'failure',
            message: 'Error occured ' + err.message
        })
    }
}

module.exports = {
    createBlog,
    blogList,
    blogLikes,
    searchBlog,
    userBlog,
    deleteblog,
    updateBlog
}
