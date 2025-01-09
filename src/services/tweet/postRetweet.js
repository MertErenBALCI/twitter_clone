const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let tweetID = repositories.tweet.randomId();
        let tweetType = 3;


        let reTweet = {
            userID: req.body.userID,
            tweetID: tweetID,
            belongTo: req.body.belongTo,
            tweetType: tweetType,
            reTweetSize: 0,
            reTweeters: [],
            quotersSize: 0,
            quoters: [],
            likeSize: 0,
            created_at: helpers.date.moment.timestamp()
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