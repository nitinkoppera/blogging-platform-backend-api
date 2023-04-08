const express = require('express')
const router = express.Router()

const Blog = require('../models/Blog')

router.get('/', async (req,res) => {
    try {
        const blogs = await Blog.find().populate("author")
        res.json(blogs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req,res) => {
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    })
    try {
        await newBlog.save()
        res.status(201).json(newBlog)
    } catch (error) {
        
    }
})

router.get('/:blogId', async (req,res) => {
    const blogId = req.params.blogId
    try {
        const blog = await Blog.findById(blogId).populate("author")
        if(!blog) return res.status(404).json({ message: 'Blog not found' })
        res.json(blog)
    } catch (error) {
        
    }
})
module.exports = router