const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let randomUserID = repositories.user.randomId();

        let match = {
            userID: randomUserID,
            userType: req.body.userType,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            nickname: req.body.nickname,
            birthday: req.body.birthday,
            profilePhoto: req.body.profilePhoto,
            profileHeaderPhoto: req.body.profileHeaderPhoto,
            bio: req.body.bio,
            followerSize: null,
            followingSize: null,
            created_Date_time: new Date(),

        };
        let isThereEmail = await repositories.user.isThereEmail(req.body.email);

        let isThereNickname = await repositories.user.isThereNickname(req.body.nickname);


        if (!isThereEmail || !isThereNickname) {

            throw new helpers.error.Conflict();
        }

        let user = await repositories.user.register(match);

        if (!user) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { user };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
