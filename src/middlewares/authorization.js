const helpers = require('../helpers');
const repositories = require('../repositories');

module.exports = async (req, res, next) => {
    try {
        if (
            typeof req.headers.authorization === 'undefined' ||
            typeof req.headers.authorization !== 'string' ||
            req.headers.authorization.length < 1
        ) {
            return res.status(new helpers.error.UnAuth(20).httpStatus).json(new helpers.error.UnAuth(20));
        }

        req.user = helpers.token.jwt.verify(req.headers.authorization);

        if (req.user) {
            let user = await repositories.user.getUserInfo(req.user_id);

            if (user === false) {
                throw new helpers.error.ServerError(9999);
            }

            if (user === null) {
                return res.status(new helpers.error.Forbidden(21).httpStatus).json(new helpers.error.Forbidden(21));
            }

            return next();
        }

        return res.status(new helpers.error.UnAuth(22).httpStatus).json(new helpers.error.UnAuth(22));
    } catch (error) {
        helpers.error.logger(error);

        return res.status(new helpers.error.ServerError().httpStatus).json(new helpers.error.ServerError());
    }
};