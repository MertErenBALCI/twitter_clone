const express = require('express');
const router = express.Router();
const services = require('../../services');
const controller = require('../../controller');
const middlewares = require('../../middlewares');

/**
 * GET /int/health-check
 * @summary healt-check endpoint
 * @tags INT
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - Server error - application/json
 */


router.get('/getUserTweets', [controller.tweet.getUserTweets], services.tweet.getUserTweets);

router.get('/getUserComments', [controller.tweet.getUserComments], services.tweet.getUserComments);
router.post('/postTweet', [middlewares.authorization, controller.tweet.postTweet], services.tweet.postTweet);
router.post('/updateTweet', [middlewares.authorization, controller.tweet.updateTweet], services.tweet.updateTweet);
router.post('/deleteTweet', [middlewares.authorization, controller.tweet.deleteTweet], services.tweet.deleteTweet);

router.post('/postComment', [middlewares.authorization, controller.tweet.postComment], services.tweet.postComment);
router.get('/getTweetComments', [controller.tweet.getTweetComments], services.tweet.getTweetComments);

router.get('/getTweetLikers', [controller.tweet.getTweetLikers], services.tweet.getTweetLikers);
router.get('/getTweetRetweeters', [controller.tweet.getTweetRetweeters], services.tweet.getTweetRetweeters);
router.get('/getTweetQuote', [controller.tweet.getTweetQuote], services.tweet.getTweetQuote);

router.post('/postRetweet', [middlewares.authorization, controller.tweet.postRetweet], services.tweet.postRetweet);

router.post('/postQuote', [middlewares.authorization, controller.tweet.postQuote], services.tweet.postQuote);
router.post('/postLike', [middlewares.authorization, controller.tweet.postLike], services.tweet.postLike);
router.post('/deleteLike', [middlewares.authorization, controller.tweet.deleteLike], services.tweet.deleteLike);


router.get('/getHomePage', [middlewares.authorization, controller.tweet.getHomePage], [services.tweet.getHomePage]);

router.get('/getProfilePage', [controller.tweet.getProfilePage], [services.tweet.getProfilePage]);
router.get('/getMyLike', [middlewares.authorization, controller.tweet.getMyLike], [services.tweet.getMyLike]);










module.exports = router;