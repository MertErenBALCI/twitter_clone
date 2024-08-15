const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let match = {
            email: req.body.email,
            password: req.body.password
        };
        let user = await repositories.user.login(match);

        if (!user) {
            throw new helpers.error.NotFound(2);
        }

        let token = helpers.token.jwt.create(user, { expiresIn: '1d' });

        responseBody.result = { user, token };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};