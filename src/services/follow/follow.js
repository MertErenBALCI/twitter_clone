const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followID = repositories.follow.randomId();
        let requestID = repositories.follow.randomId();

        let follow = {
            followID: followID,
            requestID: requestID,
            myUserID: req.body.myUserID,
            yourUserID: req.body.yourUserID,
            created_at: helpers.date.moment.timestamp()
        };

        if (req.body.myUserID === req.body.yourUserID) {
            throw new helpers.error.Conflict();
        }

        let follows = await repositories.follow.follow(follow);

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