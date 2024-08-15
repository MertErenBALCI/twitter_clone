const express = require('express');
const router = express.Router();

const int = require('./int');
const user = require('./user');
const tweet = require('./tweet');


router.use('/int', int);
router.use('/user', user);
router.use('/tweet', tweet);



module.exports = router;