const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }
})

module.exports = Like = mongoose.model('likes', LikeSchema);
