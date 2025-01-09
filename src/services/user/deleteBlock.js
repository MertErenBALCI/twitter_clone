const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {

        let user = {
            blockedID: req.body.blockedID,
            userID: req.body.userID,
        };

        let deletedBlock = await repositories.user.deleteBlock(user);

        if (!deletedBlock) {
            throw new helpers.error.Conflict();
        }

        responseBody.result = { deletedBlock };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};