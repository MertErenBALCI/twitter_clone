const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user = {
            userID: req.body.userID,
        };

        let deletedUser = await repositories.user.deleteUser(user);

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