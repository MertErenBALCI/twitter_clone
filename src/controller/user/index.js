const helpers = require('../../helpers');
// const constants = require('../../constants');
const moment = require('moment');


module.exports.login = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.email || !req.body.password) {
            throw new helpers.error.MissingField();
        }

        body.email = req.body.email.toString();
        body.password = req.body.password.toString();

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.register = (req, res, next) => {
    try {
        let body = {
            data: {}
        };

        // Eksik alanları kontrol et
        if (!req.body.userType || !req.body.email || !req.body.password || !req.body.name || !req.body.nickname || !req.body.birthday) {
            throw new helpers.error.MissingField();
        }

        if (typeof req.body.userType !== 'boolean') {
            throw new helpers.error.InvalidField('userType');
        }

        if (req.body.data && req.body.data.profilePhoto) {
            body.data.profilePhoto = req.body.data.profilePhoto.toString();
        }
        if (req.body.data && req.body.data.profileHeaderPhoto) {
            body.data.profileHeaderPhoto = req.body.data.profileHeaderPhoto.toString();
        }
        if (req.body.data && req.body.data.bio) {
            body.data.bio = req.body.data.bio.toString();
        }

        body.email = req.body.email.toString().trim();
        body.password = req.body.password.toString().trim();
        body.nickname = req.body.nickname.toString().trim();
        body.name = req.body.name.toString();

        const parsedBirthday = moment(req.body.birthday, 'DD-MM-YYYY');
        if (!parsedBirthday.isValid()) {
            throw new helpers.error.InvalidField('birthday');
        }
        body.birthday = parsedBirthday.format('DD-MM-YYYY');


        body.userType = req.body.userType;
        body.profilePhoto = req.body.profilePhoto.toString();
        body.profileHeaderPhoto = req.body.profileHeaderPhoto.toString();
        body.bio = req.body.bio.toString();

        req.body = body;

        return next();

    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
const Joi = require('joi');
module.exports.updateUser = (req, res, next) => {
    try {
        let body = {
            data: {}
        };
        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.userID) {
            throw new helpers.error.MissingField();
        }


        if (req.body.data && req.body.data.email) {
            body.data.email = req.body.data.email.toString();
        }

        if (req.body.data && req.body.data.name) {
            body.data.name = req.body.data.name.toString();
        }
        if (req.body.data && req.body.data.nickname) {
            body.data.nickname = req.body.data.nickname.toString();
        }
        if (req.body.data && req.body.data.profilePhoto) {
            body.data.profilePhoto = req.body.data.profilePhoto.toString();
        }
        if (req.body.data && req.body.data.profileHeaderPhoto) {
            body.data.profileHeaderPhoto = req.body.data.profileHeaderPhoto.toString();
        }
        if (req.body.data && req.body.data.bio) {
            body.data.bio = req.body.data.bio.toString();
        }

        const parsedBirthday = moment(req.body.birthday, 'DD-MM-YYYY');
        if (req.body.data && req.body.data.birthday) {
            if (!parsedBirthday.isValid()) {
                throw new helpers.error.InvalidField('birthday');
            }

            body.data.birthday = parsedBirthday.format('DD-MM-YYYY');
        }

        body.userID = req.body.userID.toString();
        body.email = req.body.email.toString();
        body.userType = req.body.userType;
        body.name = req.body.name.toString();
        body.nickname = req.body.nickname.toString();


        if (!parsedBirthday.isValid()) {
            throw new helpers.error.InvalidField('birthday');
        }
        body.birthday = parsedBirthday.format('DD-MM-YYYY');

        body.profilePhoto = req.body.profilePhoto.toString();
        body.profileHeaderPhoto = req.body.profileHeaderPhoto.toString();
        body.bio = req.body.bio.toString();


        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.updateUserV2 = (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),




            birth_year: Joi.number()
                .integer()
                .min(1900)
                .max(2013),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });
        let a = schema.validate(req.body);
        console.log(a);
        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.updatePassword = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }


        if (!req.body.userID || !req.body.currentPassword || !req.body.newPassword || !req.body.verificationPassword) {
            throw new helpers.error.MissingField();
        }

        if (req.body.newPassword !== req.body.verificationPassword || req.body.newPassword === req.body.currentPassword) {
            throw new helpers.error.AccessDenied();
        }
        body.userID = req.body.userID.toString();
        body.currentPassword = req.body.currentPassword.toString();
        body.newPassword = req.body.newPassword.toString();
        body.verificationPassword = req.body.verificationPassword.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteUser = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.userID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.postBlock = (req, res, next) => {
    try {
        let body = {};

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.myUserID || !req.body.yourUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteBlock = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.userID || !req.body.blockedID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.blockedID = req.body.blockedID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getBlocked = (req, res, next) => {
    try {
        let body = {};

        if (!req.body.userID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};


module.exports.getUserInfo = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.userID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};


module.exports.postSearch = (req, res, next) => {
    try {
        let body = {};

        if (!req.body.userID || !req.body.nickname) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.nickname = req.body.nickname.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
