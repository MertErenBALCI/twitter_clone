const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let userTweets = {
            userID: req.body.userID,
        };

        let getUserTweets = await repositories.tweet.getUserTweets(userTweets);

        if (!getUserTweets) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { userTweets: getUserTweets };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};