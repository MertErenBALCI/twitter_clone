const express = require('express');
const router = express.Router();

const int = require('./int');
const user = require('./user');
const tweet = require('./tweet');
const follow = require('./follow');
const message = require('./message');


router.use('/int', int);
router.use('/user', user);
router.use('/tweet', tweet);
router.use('/follow', follow);
router.use('/message', message);



module.exports = router;