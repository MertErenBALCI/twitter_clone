
const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let deleteQuote = {
            userID: req.body.userID,
            quoteID: req.body.quoteID,
            tweetID: req.body.tweetID
        };

        let deletedQuote = await repositories.tweet.deleteQuote(deleteQuote);

        if (!deletedQuote) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { user: deletedQuote };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};