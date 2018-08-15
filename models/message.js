const mongoose = require('mongoose');

// Create Schema
const messageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  message_body: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  profile_pic: {
    type: String,
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    comment_body: {
      type: String,
      required: true
    },
    name: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('message', messageSchema);