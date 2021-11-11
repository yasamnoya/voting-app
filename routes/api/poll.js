const router = require("express").Router();
const Poll = require("../../models/Poll");

router.post("/", async (req, res) => {
  let poll = await Poll.create({ title: req.body.title });

  for (let option of req.body.options) {
    poll = poll.updateOne(
      {
        $push: { votes: { label: option } }
      },
      { new: true }
    );
  }

  res.status(201).json(poll);
});

router.get("/", async (req, res) => {
  const polls = await Poll.find({});
  res.json(polls);
});

router.patch("/:pollId/vote/:label", async (req, res) => {
  let poll = await Poll.findOneAndUpdate(
    {
      _id: req.params.pollId,
      votes: {
        $elemMatch: { label: req.params.label },
      },
    },
    { $inc: { "votes.$.count": 1 } },
    { new: true },
  );
  if (poll) {
    return res.json(poll);
  }

  poll = await Poll.findOneAndUpdate(
    {
      _id: req.params.pollId,
    },
    {
      $push:
      {
        votes: {
          label: req.params.label,
          count: 1
        }
      }
    },
    { new: true }
  );
  if (poll) {
    return res.json(poll);
  }

  res.status(404).send();
});

module.exports = router;
