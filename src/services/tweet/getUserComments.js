const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let skip = req.body.skip;
        let limit = req.body.limit;

        let userComment = {
            myUserID: req.body.myUserID,
            yourUserID: req.body.yourUserID,
            skip: skip,
            limit: limit,

        };

        let getUserComments = await repositories.tweet.getUserComments(userComment);

        if (!getUserComments) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { userComments: getUserComments };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};