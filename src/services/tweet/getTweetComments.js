const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let skip = req.body.skip;
        let limit = req.body.limit;

        let TweetComments = {
            tweetID: req.body.tweetID,
            skip: skip,
            limit: limit,
        };

        let getTweetComments = await repositories.tweet.getTweetComments(TweetComments);

        if (!getTweetComments) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { TweetComments: getTweetComments };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};