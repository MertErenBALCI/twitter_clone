const helpers = require('../../helpers');
// const constants = require('../../constants');

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
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getMyLikedTweets = (req, res, next) => {
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

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

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

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

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

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.myUserID || !req.body.followID || !req.body.yourUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.followID = req.body.followID.toString();
        body.yourUserID = req.body.yourUserID.toString();


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

        if (req.body.myUserID != req.user.userID) {
            throw new helpers.error.UnAuth();
        }

        if (!req.body.myUserID || !req.body.followID || !req.body.yourUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.followID = req.body.followID.toString();
        body.yourUserID = req.body.yourUserID.toString();

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

        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

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
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};