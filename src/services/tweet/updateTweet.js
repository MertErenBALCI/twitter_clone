
const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let updateTweet = {
            userID: req.body.userID,
            tweetID: req.body.tweetID,
            tweet: req.body.tweet,
        };

        let updatedTweet = await repositories.tweet.updateTweet(updateTweet);

        if (!updatedTweet) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { user: updatedTweet };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};