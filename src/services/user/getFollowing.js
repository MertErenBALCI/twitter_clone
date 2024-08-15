const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let myUserID = {
            follower: req.body.myUserID,
        };

        let following = await repositories.user.getFollowing(myUserID);

        if (!following) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { following };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};