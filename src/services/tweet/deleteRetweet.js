const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let deleteRetweet = {
            userID: req.body.userID,
            tweetID: req.body.tweetID,
        };

        let deletedRetweet = await repositories.tweet.deleteRetweet(deleteRetweet);

        if (!deletedRetweet) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { deletedRetweet };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};