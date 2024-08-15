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
        let body = {};
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.nickname || !req.body.birthday || !req.body.profilePhoto || !req.body.profileHeaderPhoto || !req.body.bio) {
            throw new helpers.error.MissingField();
        }

        body.email = req.body.email.toString();
        body.password = req.body.password.toString();
        body.name = req.body.name.toString();
        body.nickname = req.body.nickname.toString();


        const parsedBirthday = moment(req.body.birthday, 'DD-MM-YYYY');
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

module.exports.message = (req, res, next) => {
    try {
        let body = {};

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.myUserID || !req.body.yourUserID || !req.body.mymessage) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();
        body.mymessage = req.body.mymessage.toString();


        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.follow = (req, res, next) => {
    try {
        let body = {};

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.AccessDenied();
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

module.exports.getRequests = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.myUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.acceptFollowRequest = (req, res, next) => {
    try {
        let body = {};

        if (!req.body.myUserID || !req.body.yourUserID || !req.body.requestID) {
            throw new helpers.error.MissingField();
        }

        body.requestID = req.body.requestID.toString();
        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteFollowRequest = (req, res, next) => {
    try {
        let body = {};

        if (!req.body.myUserID || !req.body.yourUserID || !req.body.requestID) {
            throw new helpers.error.MissingField();
        }

        body.requestID = req.body.requestID.toString();
        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};


module.exports.deleteFollower = (req, res, next) => {
    try {
        let body = {};

        /*if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }*/

        if (!req.body.myUserID || !req.body.followID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.followID = req.body.followID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.deleteFollow = (req, res, next) => {
    try {
        let body = {};

        /*if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }*/

        if (!req.body.myUserID || !req.body.followID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.followID = req.body.followID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getFollower = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.myUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.getFollowing = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.myUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};


module.exports.updateUser = (req, res, next) => {
    try {
        let body = {};
        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.userID || !req.body.email || !req.body.userType || !req.body.name || !req.body.nickname || !req.body.birthday || !req.body.profilePhoto || !req.body.profileHeaderPhoto || !req.body.bio) {
            throw new helpers.error.MissingField();
        }
        body.userID = req.body.userID.toString();
        body.email = req.body.email.toString();
        body.userType = (req.body.userType === 'true' || req.body.userType === true) ? true : false;
        body.name = req.body.name.toString();
        body.nickname = req.body.nickname.toString();

        const parsedBirthday = moment(req.body.birthday, 'DD-MM-YYYY');
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

module.exports.updatePassword = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }


        if (!req.body.userID || !req.body.currentPassword || !req.body.newPassword || !req.body.verificationPassword) {
            throw new helpers.error.MissingField();
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

module.exports.getUserInfo = (req, res, next) => {
    try {
        let body = {};
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