const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {

        let okeyRequest = {
            requestID: req.body.requestID,
            requester: req.body.yourUserID,
            reciever: req.body.myUserID,
        };


        let isOkeyRequest = await repositories.follow.deleteFollowRequest(okeyRequest);

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