const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let skip = req.body.skip;
        let limit = req.body.limit;

        let myUserID = {
            following: req.body.myUserID,
            skip: skip,
            limit: limit,
        };

        let follower = await repositories.follow.getFollower(myUserID);

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