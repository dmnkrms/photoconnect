const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 30
  },
  location: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  webpage: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    ig: {
      type: String
    }
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
