const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let myUserID = {
            following: req.body.myUserID,
        };

        let follower = await repositories.user.getFollower(myUserID);

        if (!follower) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { follower };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};