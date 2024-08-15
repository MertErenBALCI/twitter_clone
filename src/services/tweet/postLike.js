const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');

module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let likedID = repositories.tweet.randomId();


        let like = {
            userID: req.body.userID,
            tweetID: req.body.tweetID,
            likedID: likedID,
            created_Date_time: new Date()

        };

        let isLiked = await repositories.tweet.postLike(like);

        if (!isLiked) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { isLiked };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};