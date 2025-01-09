const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let tweetID = repositories.tweet.randomId();
        const tweetType = 2;

        let comment = {
            userID: req.body.userID,
            tweetType: tweetType,
            belongTo: req.body.belongTo,
            tweetID: tweetID,
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

        let comments = await repositories.tweet.postComment(comment);

        if (!comments) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { comments };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};