const helpers = require('../../helpers');
// const constants = require('../../constants');


module.exports.postMessage = (req, res, next) => {
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

module.exports.getMessages = (req, res, next) => {
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
        body.skip = parseInt(req.body.skip, 10) || 0;
        body.limit = parseInt(req.body.limit, 10) || 10;


        req.body = body;

        return next();

    } catch (error) {

        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

