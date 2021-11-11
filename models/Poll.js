const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  votes: [{
    label: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  }],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;