const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {

    let responseBody = constants.response.DEFAULT();

    try {

        let skip = req.body.skip;
        let limit = req.body.limit;

        let search = {
            userID: req.body.userID,
            nickname: req.body.nickname,
            skip: skip,
            limit: limit,
        };

        let searchResults = await repositories.user.postSearch(search);

        if (!searchResults) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { searchResults: searchResults };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
