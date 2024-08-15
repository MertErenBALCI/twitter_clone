const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let quoteID = repositories.tweet.randomId();
        const tweetType = 4;

        let quote = {
            userID: req.body.userID,
            tweetType: tweetType,
            tweetID: req.body.tweetID,
            quoteID: quoteID,
            tweet: req.body.tweet,
            created_Date_time: new Date()

        };

        let quotes = await repositories.tweet.postQuote(quote);

        if (!quotes) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { quotes };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};