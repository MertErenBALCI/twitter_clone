const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let blockedID = repositories.user.randomId();

        let user = {
            blockedID: blockedID,
            myUserID: req.body.myUserID,
            yourUserID: req.body.yourUserID,
            created_at: helpers.date.moment.timestamp()

        };

        let deletedUser = await repositories.user.postBlock(user);

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