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
router.post('/postTweet', [middlewares.authorization, controller.tweet.postTweet], services.tweet.postTweet);
router.post('/updateTweet', [controller.tweet.updateTweet], services.tweet.updateTweet);
router.post('/deleteTweet', [controller.tweet.deleteTweet], services.tweet.deleteTweet);

//router.post('/likeTweet', [middlewares.authorization, controller.tweet.postTweet], services.tweet.postTweet);
router.post('/postComment', [controller.tweet.postComment], services.tweet.postComment);
router.post('/postCommenttoComment', [controller.tweet.postCommenttoComment], services.tweet.postCommenttoComment);
router.get('/getTweetComments', [controller.tweet.getTweetComments], services.tweet.getTweetComments);

router.get('/getTweetCommenttoComments', [controller.tweet.getTweetCommenttoComments], services.tweet.getTweetCommenttoComments);

router.post('/postRetweet', [controller.tweet.postRetweet], services.tweet.postRetweet);
router.post('/deleteRetweet', [controller.tweet.deleteRetweet], services.tweet.deleteRetweet);

router.post('/postQuote', [controller.tweet.postQuote], services.tweet.postQuote);
router.post('/deleteQuote', [controller.tweet.deleteQuote], services.tweet.deleteQuote);
router.post('/updateQuote', [controller.tweet.updateQuote], [services.tweet.updateQuote]);


router.post('/postLike', [controller.tweet.postLike], services.tweet.postLike);
router.post('/deleteLike', [controller.tweet.deleteLike], services.tweet.deleteLike);

router.post('/getHomePage', [controller.tweet.getHomePage], [services.tweet.getHomePage]);

router.post('/getProfilePage', [controller.tweet.getProfilePage], [services.tweet.getProfilePage]);






module.exports = router;