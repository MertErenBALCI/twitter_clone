const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let messageID = repositories.user.randomId();

        let message = {
            messageID: messageID,
            myUserID: req.body.myUserID,
            yourUserID: req.body.yourUserID,
            mymessage: req.body.mymessage,
            created_at: helpers.date.moment.timestamp()
        };

        let messages = await repositories.message.messages(message);

        if (!messages) {
            throw new helpers.error.NotFound(2);
        }


        responseBody.result = { message };

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);

    }

    return res.status(responseBody.httpStatus).json(responseBody);
};