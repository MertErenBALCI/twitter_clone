const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');

module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let tweetID = repositories.tweet.randomId();
        const tweetType = 1;

        let tweet = {
            userID: req.body.userID,
            tweetType: tweetType,
            tweetID: tweetID,
            belongTo: null,
            tweet: req.body.tweet,
            reTweetSize: 0,
            reTweeters: [],
            quotersSize: 0,
            quoters: [],
            likeSize: 0,
            commenters: [],
            commentSize: 0,
            created_at: helpers.date.moment.timestamp()

        };

        let tweets = await repositories.tweet.postTweet(tweet);

        if (!tweets) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { tweets };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};