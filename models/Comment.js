const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { maxDepth: 2 }
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    autopopulate: { maxDepth: 2 }
  },
});

module.exports = mongoose.model('Comment', CommentSchema);