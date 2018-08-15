const mongoose = require('mongoose');

// Create Schema
const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true,
  },
  employer_name: {
    type: String
  },
  website: {
    type: String
  },
  address: {
    type: String
  },
  current_role: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  github: {
    type: String
  },
  exp: [{
    role: {
      type: String,
      required: true
    },
    employer_name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    started: {
      type: Date,
      required: true
    },
    ended: {
      type: Date
    },
    is_current: {
      type: Boolean,
      default: false
    },
    desc: {
      type: String
    }
  }],
  edu: [{
    institution_name: {
      type: String,
      required: true
    },
    degree_type: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    started: {
      type: Date,
      required: true
    },
    ended: {
      type: Date
    },
    is_current: {
      type: Boolean,
      default: false
    },
    desc: {
      type: String
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', profileSchema);