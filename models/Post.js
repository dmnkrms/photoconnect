const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function activeTill() {
  var dat = new Date();
  dat.setDate(dat.getDate() + 30);
  return dat;
}

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  lookingFor: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  candidates: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: {
        type: String
      },
      handle: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      handle: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  activeTill: {
    type: Date,
    default: activeTill()
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
