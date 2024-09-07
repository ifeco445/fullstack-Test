const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser =  async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({ name, email, password });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      // Create a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
  
      // Sign the token and send it to the client
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

const authUser =  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }

    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    console.log(password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.json({ token, user: { id: user._id, username: user.name } });
};




const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
// Route to add a friend
const addFriend = async (req, res) => {
  try {
      const userId = req.params.userId;  // The current user ID
      const { friendId } = req.body;  // The ID of the friend being added

      // 1. Find the current user by their ID
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // 2. Check if the friend exists
      const friend = await User.findById(friendId);
      if (!friend) {
          return res.status(404).json({ message: 'Friend not found' });
      }

      // 3. Check if the friend is already in the user's friends list
      if (user.friends.includes(friendId)) {
          return res.status(400).json({ message: 'User is already a friend' });
      }

      // 4. Add the friend's ID to the current user's friends list
      user.friends.push(friendId);
      await user.save(); // Save the updated user document

      return res.status(200).json({ message: 'Friend added successfully', user });
  } catch (error) {
      return res.status(500).json({ message: 'Error adding friend', error });
  }
};




module.exports = {
    authUser,
    registerUser,
    logoutUser,
    addFriend
};
