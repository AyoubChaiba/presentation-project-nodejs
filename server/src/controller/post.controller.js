import { Post } from "../model/post.js"


export const CreatPost = async (req, res) => {
    try {
        const { title , description , user_id } = req.body;
        if (title && description && user_id) {
            const post = new Post({
                title,
                description,
                user_id
            })
            const savePost = await post.save()
            if (savePost) {
                return res.status(200).json({
                    savePost
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

export const showPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id');
        return res.status(200).json(
            posts.map(post => {
                return {
                    id : post._id,
                    title: post.title,
                    description: post.description,
                    user : {
                        id : post.user_id._id,
                        email : post.user_id.email,
                        name : post.user_id.name,
                    }
                }
            })
        )
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}