const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followID = repositories.user.randomId();

        let okeyRequest = {
            followID: followID,
            requestID: req.body.requestID,
            follower: req.body.myUserID,
            following: req.body.yourUserID,
            created_Date_time: new Date()
        };


        let isOkeyRequest = await repositories.user.acceptFollowRequest(okeyRequest);

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