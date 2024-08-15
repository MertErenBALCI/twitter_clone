const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');

module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let tweetID = repositories.tweet.randomId();
        const tweetType = 1;
        const commentID = null;
        let tweet = {
            userID: req.body.userID,
            tweetType: tweetType,
            tweetID: tweetID,
            commentID: commentID,
            tweet: req.body.tweet,
            created_Date_time: new Date()

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