const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let skip = req.body.skip;
        let limit = req.body.limit;

        let user = {
            userID: req.body.userID,
            created_at: helpers.date.moment.timestamp(),
            skip: skip,
            limit: limit,

        };

        let deletedUser = await repositories.user.getBlocked(user);

        if (!deletedUser) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { user: deletedUser };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};