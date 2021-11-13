const router = require('express').Router()
const { User } = require("../../models");
const { auth } = require('../../middlewares');

router.post('/', async (req, res) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();

  try {
    await user.save()
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send()
  }
});

router.post('/logout-all', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send()
  }
});

module.exports =  router