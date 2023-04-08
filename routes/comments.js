const express = require('express')
const router = express.Router();
const Comments = require('../models/Comment')

router.get('/',async(req,res) => {
    try {
        const comments = await Comments.find().populate("user").populate("blog");
        res.json(comments);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req,res) => {
    const newComment = new Comments({
        content: req.body.content,
        user: req.body.user,
        blog: req.body.blog,
    })
    try {
        await newComment.save();
        res.status(201).json(newComment)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:commentId', async (req,res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await Comments.findById(commentId).populate("user").populate("blog");
        res.json(comment)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
module.exports = router