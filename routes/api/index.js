const router = require('express').Router()

router.use('/poll', require('./poll'));

module.exports = router;