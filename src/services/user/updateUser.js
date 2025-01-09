const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user = {
            userID: req.body.userID,
            email: req.body.email,
            userType: req.body.userType !== undefined ? req.body.userType : false,
            name: req.body.name,
            nickname: req.body.nickname,
            birthday: req.body.birthday,
            profilePhoto: req.body.profilePhoto,
            profileHeaderPhoto: req.body.profileHeaderPhoto,
            bio: req.body.bio,
            updated_at: helpers.date.moment.timestamp()
        };

        let updatedUser = await repositories.user.updateUser(user);

        if (!updatedUser) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { user: updatedUser };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};