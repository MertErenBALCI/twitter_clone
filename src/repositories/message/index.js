const helpers = require('../../helpers');
const db = require('../../db');
// const constants = require('../../constants');

module.exports.isThereEmail = async (email) => {

    let kullaniciVarMi = await new db.mongodb.CRUD('twitter', 'users').find({ email });
    if (kullaniciVarMi.length > 0) {

        return false;
    }
    return true;

};

module.exports.isThereNickname = async (nickname) => {

    let kullaniciVarMi = await new db.mongodb.CRUD('twitter', 'users').find({ nickname });
    if (kullaniciVarMi.length > 0) {

        return false;
    }
    return true;

};

module.exports.randomId = () => {
    let randomId = db.mongodb.id();

    return randomId;
};


module.exports.messages = async (message) => {
    try {

        let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
            follower: message.myUserID,
            following: message.yourUserID,
        });

        if ((isFollow && isFollow.length > 0)) {
            let messages = await new db.mongodb.CRUD('twitter', 'messages').insert(message);

            if (messages !== false) {
                if (messages.length > 0) {
                    return messages[0];
                }
                return null;
            }
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};


module.exports.getMessages = async (message) => {
    try {
        let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
            $or: [
                {
                    follower: message.myUserID,
                    following: message.yourUserID,
                },
                {
                    following: message.myUserID,
                    follower: message.yourUserID,
                }
            ]

        });

        if (isFollow && isFollow.length > 0) {
            let getMessages = await new db.mongodb.CRUD('twitter', 'messages').find(
                {
                    $or: [
                        { myUserID: message.myUserID, yourUserID: message.yourUserID },
                        { myUserID: message.yourUserID, yourUserID: message.myUserID }
                    ]
                },
                [message.skip, message.limit],
                {},
                { createdAt: -1 },
                {}
            );
            if (getMessages.length > 0) {
                return getMessages;
            }
            return null;
        }
        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

