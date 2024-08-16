
const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        const tweetType = 4;

        let updateQuote = {
            userID: req.body.userID,
            quoteID: req.body.quoteID,
            tweetType: tweetType,
            tweet: req.body.tweet,
        };

        let updateQuotes = await repositories.tweet.updateQuote(updateQuote);

        if (!updateQuotes) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { updateQuotes };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};