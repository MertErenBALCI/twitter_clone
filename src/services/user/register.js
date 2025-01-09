const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user_id = repositories.user.randomId();
        let userType = req.body.userType === 'true';

        let match = {
            userID: user_id,
            userType: userType,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            nickname: req.body.nickname,
            birthday: req.body.birthday,
            profilePhoto: req.body.profilePhoto,
            profileHeaderPhoto: req.body.profileHeaderPhoto,
            bio: req.body.bio,
            followerSize: 0,
            followingSize: 0,
            created_at: helpers.date.moment.timestamp()
        };
        let isThere = await repositories.user.isThere(req.body.email, req.body.nickname);


        if (!isThere) {

            throw new helpers.error.Conflict();
        }

        let user = await repositories.user.register(match);

        if (!user) {
            throw new helpers.error.NotFound(3);
        }

        responseBody.result = { user };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
