const router = require('express').Router()

router.use('/poll', require('./poll'));
router.use('/user', require('./user'));

module.exports = router;