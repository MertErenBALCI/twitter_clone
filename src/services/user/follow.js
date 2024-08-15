const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followID = repositories.user.randomId();
        let requestID = repositories.user.randomId();

        let follow = {
            followID: followID,
            requestID: requestID,
            myUserID: req.body.myUserID,
            yourUserID: req.body.yourUserID,
            created_Date_time: new Date()
        };

        if (req.body.myUserID === req.body.yourUserID) {
            throw new helpers.error.Conflict();
        }

        let follows = await repositories.user.follow(follow);

        if (!follows) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { follows };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);

    }

    return res.status(responseBody.httpStatus).json(responseBody);
};