const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let ProfilePage = {
            userID: req.body.userID,
        };

        let ProfilePages = await repositories.tweet.getProfilePage(ProfilePage);

        if (!ProfilePages) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { ProfilePages };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};