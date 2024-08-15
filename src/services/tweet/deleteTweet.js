const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let deleteTweet = {
            userID: req.body.userID,
            tweetID: req.body.tweetID,
        };

        let deletedTweet = await repositories.tweet.deleteTweet(deleteTweet);

        if (!deletedTweet) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { user: deletedTweet };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};