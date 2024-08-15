const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let commentID = repositories.tweet.randomId();
        const tweetType = 2;

        let comment = {
            userID: req.body.userID,
            tweetType: tweetType,
            tweetID: req.body.tweetID,
            commentID: commentID,
            tweet: req.body.tweet,
            created_Date_time: new Date()

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