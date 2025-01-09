const helpers = require('../../helpers');
// const constants = require('../../constants');

module.exports.getUserTweets = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.myUserID || !req.body.yourUserID) {
            throw new helpers.error.MissingField();
        }

        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getUserComments = (req, res, next) => {
    try {
        let body = {};

        body.myUserID = req.body.myUserID.toString();
        body.yourUserID = req.body.yourUserID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.getHomePage = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

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

module.exports.getProfilePage = (req, res, next) => {
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
module.exports.getTweetComments = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getTweetLikers = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getMyLike = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

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

module.exports.getTweetRetweeters = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getTweetQuote = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.postTweet = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.tweet) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.tweet = req.body.tweet.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};


module.exports.updateTweet = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.tweetID || !req.body.tweet) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.tweetID = req.body.tweetID.toString();
        body.tweet = req.body.tweet.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteTweet = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if ((!req.body.userID || !req.body.tweetID) || !req.body.belongTo || !req.body.tweetType) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.tweetID = req.body.tweetID.toString();
        body.belongTo = req.body.belongTo.toString();
        body.tweetType = req.body.tweetType.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.postComment = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.belongTo || !req.body.tweet) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.belongTo = req.body.belongTo.toString();
        body.tweet = req.body.tweet.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.postRetweet = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.belongTo) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.belongTo = req.body.belongTo.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.postQuote = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.belongTo || !req.body.tweet) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.belongTo = req.body.belongTo.toString();
        body.tweet = req.body.tweet.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.postLike = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.tweetID = req.body.tweetID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
module.exports.deleteLike = (req, res, next) => {
    try {
        let body = {};

        if (req.body.userID != req.user.userID) {
            throw new helpers.error.AccessDenied();
        }

        if (!req.body.userID || !req.body.tweetID || !req.body.likedID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.tweetID = req.body.tweetID.toString();
        body.likedID = req.body.likedID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
