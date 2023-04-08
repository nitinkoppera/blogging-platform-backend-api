const express = require('express')
const router = express.Router();

const user = require('../models/User');
const User = require('../models/User');
const { route } = require('express/lib/application');

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    })
    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:userId', async (req,res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ message: 'User not found' })
        res.json(user)
    } catch (error) {
        
    }
})

// can add delete method also

module.exports = router