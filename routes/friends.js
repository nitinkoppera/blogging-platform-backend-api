const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Comment = require('../models/Comment');

// Get all n-th level friends of a specific user
router.get('/:userId/level/:levelNo', async (req, res) => {
  try {
    const { userId, levelNo } = req.params;

    if (!parseInt(levelNo) || levelNo < 1) {
      return res.status(400).json({ message: 'Invalid level number' });
    }

    const nthLevelFriends = await getNthLevelFriends(userId, parseInt(levelNo));
    res.json(nthLevelFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getNthLevelFriends(userId, levelNo) {
  const visitedUsers = new Set([userId]);
  let currentLevelUsers = [userId];

  for (let i = 1; i <= levelNo; i++) {
    const nextLevelUsers = new Set();

    for (const currentUserId of currentLevelUsers) {
      const friends = await findDirectFriends(currentUserId);
      friends.forEach(friendId => {
        if (!visitedUsers.has(friendId)) {
          nextLevelUsers.add(friendId);
        }
      });
    }

    if (i === levelNo) {
      const nthLevelFriends = [];
      for (const friendId of nextLevelUsers) {
        const friend = await User.findById(friendId, 'username');
        nthLevelFriends.push(friend);
      }
      return nthLevelFriends;
    }

    visitedUsers.add(...nextLevelUsers);
    currentLevelUsers = [...nextLevelUsers];
  }

  return [];
}

async function findDirectFriends(userId) {
  const comments = await Comment.find({ user: userId }).populate('blog');
  const blogIds = comments.map(comment => comment.blog.id);

  const friendsComments = await Comment.find({
    blog: { $in: blogIds }, // finds comment which contains atleast one element in blogIds
    user: { $ne: userId } // similar
  });

  const friendsSet = new Set();
  friendsComments.forEach(comment => friendsSet.add(comment.user.toString()));

  return [...friendsSet];
}

module.exports = router;