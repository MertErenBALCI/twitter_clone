const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let TweetCommenttoComments = {
            tweetID: req.body.tweetID,
        };

        let getTweetCommenttoComments = await repositories.tweet.getTweetCommenttoComments(TweetCommenttoComments);

        if (!getTweetCommenttoComments) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { TweetCommenttoComments: getTweetCommenttoComments };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};