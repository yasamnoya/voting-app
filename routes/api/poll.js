const router = require("express").Router();
const { Poll, Vote } = require("../../models");

router.post("/", async (req, res) => {
  const newPoll = {
    title: req.body.title,
  };
  let poll = await Poll.create(newPoll);
  const votes = await Vote.insertMany(req.body.options.map((option) => ({ label: option, pollId: poll._id })))
  await poll.updateOne({
    $push: {
      votes: votes.map((vote => vote._id))
    }
  });

  poll = await Poll.findById(poll._id).populate('votes');
  res.status(201).json(poll);
});

router.get("/", async (req, res) => {
  const polls = await Poll.find({}).populate();
  res.json(polls);
});

router.patch("/:pollId/vote/:label", async (req, res) => {
  let vote = await Vote.findOneAndUpdate(
    {
      pollId: req.params.pollId,
      label: req.params.label,
    },
    { $inc: { count: 1 } },
    { new: true },
  );
  if (vote) {
    return res.json(vote);
  }

  vote = await Vote.create({
    label: req.params.label,
    count: 1,
    pollId: req.params.pollId,
  });
  const poll = await Poll.findOneAndUpdate(
    {
      _id: req.params.pollId,
    },
    {
      $push:
      {
        votes: vote._id
      },
    },
    { new: true }
  );
  if (poll) {
    return res.json(vote);
  }

  res.status(404).send();
});

module.exports = router;
