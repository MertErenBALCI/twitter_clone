const constants = require('../../constants');

const helpers = require('../../helpers');

const repositories = require('../../repositories');


module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let tweetID = repositories.tweet.randomId();
        const tweetType = 4;

        let quote = {
            userID: req.body.userID,
            tweetType: tweetType,
            tweetID: tweetID,
            belongTo: req.body.belongTo,
            tweet: req.body.tweet,
            reTweetSize: 0,
            reTweeters: [],
            quotersSize: 0,
            quoters: [],
            likeSize: 0,
            created_at: helpers.date.moment.timestamp()

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