const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let deleteLike = {
            likedID: req.body.likedID,
            userID: req.body.userID,
            tweetID: req.body.tweetID,

        };

        let deletedLike = await repositories.tweet.deleteLike(deleteLike);

        if (!deletedLike) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { deletedLike };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};