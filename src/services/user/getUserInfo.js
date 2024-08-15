const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user = {
            userID: req.body.userID,
        };

        let getUserInfo = await repositories.user.getUserInfo(user);

        if (!getUserInfo) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { user: getUserInfo };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};