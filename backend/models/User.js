// backend/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { // We will use the Cognito 'sub' ID as the main ID
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Teacher', 'Student'],
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;