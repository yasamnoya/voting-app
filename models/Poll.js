const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Vote',
    required: true,
  }],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;