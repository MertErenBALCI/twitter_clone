const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let reTweetID = repositories.tweet.randomId();


        let reTweet = {
            userID: req.body.userID,
            tweetID: req.body.tweetID,
            reTweetID: reTweetID,
            created_Date_time: new Date()
        };

        let reTweets = await repositories.tweet.postRetweet(reTweet);

        if (!reTweets) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { reTweets };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};