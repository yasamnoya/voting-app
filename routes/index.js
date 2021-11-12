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
  const polls = await Poll.find({}).populate('votes');
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
  res.render('home', { pollData });
});

router.get('/new-poll', (req, res) => {
  res.render('new-poll');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router