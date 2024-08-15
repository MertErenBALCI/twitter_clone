const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let myUserID = {
            myUserID: req.body.myUserID,
        };

        let requests = await repositories.user.getRequests(myUserID);

        if (!requests) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { requests };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};