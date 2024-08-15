
const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followID = {
            followID: req.body.followID,
        };

        let deletedFollow = await repositories.user.deleteFollow(followID);

        if (!deletedFollow) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { deletedFollow };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};