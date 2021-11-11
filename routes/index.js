const router = require('express').Router();
const Poll = require('../models/Poll');

let pollData = [{
  info: {
    title: "Fruit",
    createdBy: "asdf"
  },
  data: {
    labels: [ "Apple", "Banana" ],
    votes: [ 19, 22 ]
  },
}, {
  info: {
    title: "Color",
    createdBy: "jkl"
  }, 
  data: {
    labels: [ "Red", "Blue" ],
    votes: [ 3, 9 ]
  },
}];

router.use('/api', require('./api'));

router.get('/', async (req, res) => {
  const polls = await Poll.find({});
  console.log(polls)
  pollData = polls.map((poll) => ({
    id: poll._id,
    info: {
      title: poll.title,
      createdBy: "JN"
    },
    data: {
      labels: poll.votes.map((vote) => vote.label),
      votes: poll.votes.map((vote) => vote.count),
    },
  }));
  console.log(pollData[0])
  res.render('home', { pollData });
});

module.exports = router