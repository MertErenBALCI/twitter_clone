const helpers = require('../../helpers');
// const constants = require('../../constants');

module.exports.getUserTweets = (req, res, next) => {
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
module.exports.getTweetComments = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();

        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getTweetCommenttoComments = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.tweetID) {
            throw new helpers.error.MissingField();
        }

        body.tweetID = req.body.tweetID.toString();

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

module.exports.postComment = (req, res, next) => {
    try {
        let body = {};

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

module.exports.postCommenttoComment = (req, res, next) => {
    try {
        let body = {};

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

module.exports.postRetweet = (req, res, next) => {
    try {
        let body = {};

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

module.exports.deleteRetweet = (req, res, next) => {
    try {
        let body = {};

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

module.exports.postQuote = (req, res, next) => {
    try {
        let body = {};

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

module.exports.deleteQuote = (req, res, next) => {
    try {
        let body = {};

        if (!req.body.userID || !req.body.quoteID) {
            throw new helpers.error.MissingField();
        }

        body.userID = req.body.userID.toString();
        body.quoteID = req.body.quoteID.toString();

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
