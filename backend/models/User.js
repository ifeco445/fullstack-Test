const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to other User documents
      }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
