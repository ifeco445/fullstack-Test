
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const {
    authUser,
    registerUser,
    logoutUser,
    addFriend,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', authUser);

// Logout Route
router.post('/logout', logoutUser);

//Get Users
router.get('/user', async function (req, res) {
    const users = await User.find({});

    res.send(users);
    })

// Get Users with their ID
router.get('/user', async function (req, res) {
  try {
      const users = await User.find({});

      // Map users to include `id` instead of `_id`
      const usersWithId = users.map(user => {
          return {
              id: user._id,      // Use `id` instead of `_id`
              name: user.name,
              email: user.email,
              friends: user.friends
          };
      });

      res.status(200).send(usersWithId);  // Send the modified user data
  } catch (error) {
      res.status(500).send({ message: 'Error fetching users', error });
  }
});

//Get User by Id
router.get('/user/:id', async function (req, res) {
    try{
  const user = await User.findById(req.params.id);
  res.send(user);
  }catch(err){
        console.log("No data found for user")
  }
})
// Create a Blog Post
router.post('/post/:id', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, user: req.params.id });
    await post.save();
    res.status(201).send(post);
});

//get post by id
router.get('/post/:id', async (req, res)=>{

  const user = await User.findById(req.params.id);
    try{
  const post = await Post.find({user});
  res.send(post);
    }catch(err){
        console.log("No data found for post")
    }
})

//Add friends to user
router.post('/addFriend/:userId', addFriend);

// Route to get user and their friends
router.get('/friends/:userId', async (req, res) => {
  try {
      const user = await User.findById(req.params.userId).populate('friends', 'name email');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
  } catch (error) {
      return res.status(500).json({ message: 'Error retrieving user', error });
  }
});

module.exports = router;