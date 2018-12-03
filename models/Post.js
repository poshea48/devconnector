const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  likes_count: {
    type: Number,
    default: 0
  },
  comments: [
    { type: Schema.Types.ObjectId, ref: 'comments'}
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('posts', PostSchema);
