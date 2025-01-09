const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let skip = req.body.skip;
        let limit = req.body.limit;

        let myUserID = {
            myUserID: req.body.myUserID,
            userID: req.body.userID,
            skip: skip,
            limit: limit,
        };

        let requests = await repositories.follow.getRequests(myUserID);

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