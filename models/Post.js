const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { maxDepth: 2 }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    autopopulate: { maxDepth: 2 }
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 2 }
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 2 }
  }],
});

PostSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Post', PostSchema);