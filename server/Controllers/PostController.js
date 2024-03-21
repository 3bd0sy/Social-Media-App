import postModel from "../Models/postModel.js"
import bcrypt from "bcrypt"
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";


export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);

    try {
        await newPost.save()
        res.status(200).json("post created")
    } catch (error) {
        res.status(500).json(error)
    }
}



export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("post has been updated")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}




export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(id)
        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json("post has been deleted")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(id)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ "$push": { likes: userId } })
            res.status(200).json("post has been liked")
        } else {
            await post.updateOne({ "$pull": { likes: userId } })
            res.status(200).json("post has been unliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}




export const getTimeLinePost = async (req, res) => {
    const userId = req.params.id;
    try {
        const currentUserPost = await postModel.find({ userId: userId })
        const followingPost = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            }, {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            }, {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        // res.status(200).json(currentUserPost.concat(...followingPost).sort((a, b) => { return b.createdAt - a.createdAt }))//[0].followingPosts
        try {
            res.status(200).json(currentUserPost.concat(...followingPost[0].followingPosts).sort((a, b) => { return b.createdAt - a.createdAt }))//
        } catch (error) {
            res.status(200).json(currentUserPost.concat(...followingPost))
        }
    } catch (error) {
        res.status(500).json(error)
    }
}