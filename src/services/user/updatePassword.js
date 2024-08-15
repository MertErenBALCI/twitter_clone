const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let passwordInfo = {
            userID: req.body.userID,
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword,
            verificationPassword: req.body.verificationPassword
        };

        let isNewPassword = await repositories.user.updatePassword(passwordInfo);

        if (!isNewPassword) {
            throw new helpers.error.NotFound();
        }

        responseBody.result = { NEWPASSWORD: passwordInfo.newPassword };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};