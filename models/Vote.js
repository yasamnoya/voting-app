const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required : true,
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;