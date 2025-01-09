const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followID = repositories.follow.randomId();

        let okeyRequest = {
            followID: followID,
            requestID: req.body.requestID,
            follower: req.body.myUserID,
            following: req.body.yourUserID,
            created_at: helpers.date.moment.timestamp()
        };


        let isOkeyRequest = await repositories.follow.acceptFollowRequest(okeyRequest);

        if (!isOkeyRequest) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { isOkeyRequest };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);

    }

    return res.status(responseBody.httpStatus).json(responseBody);
};