const helpers = require('../../helpers');
const db = require('../../db');
// const constants = require('../../constants');


module.exports.login = async (match) => {
    try {
        console.log(JSON.stringify(match));
        let query = await new db.mongodb.CRUD('twitter', 'users').find(match, [0, 1], { password: false });

        if (query !== false) {
            if (query.length > 0) {
                return query[0];
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.register = async (match) => {

    try {

        let query = await new db.mongodb.CRUD('twitter', 'users').insert(match);

        if (query !== false) {
            if (query.length > 0) {
                return query[0];
            }
            return null;
        }

        return false;
    } catch (error) {
        helpers.error.logger(error);
    }


};

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

        let messages = await new db.mongodb.CRUD('twitter', 'messages').insert(message);

        if (messages !== false) {
            if (messages.length > 0) {
                return messages[0];
            }
            return null;
        }


        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.follow = async (follow) => {
    try {
        let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
            follower: follow.myUserID,
            following: follow.yourUserID
        });

        if (isFollow && isFollow.length > 0) {
            const isFollowID = isFollow[0].followID;
            return {
                error: 'Bu kullanıcıyı zaten takip ediyorsunuz.',
                followID: isFollowID
            };
        }

        let user = await new db.mongodb.CRUD('twitter', 'users').find({
            userID: follow.yourUserID
        });

        if (user && user.length > 0 && user[0].userType === true) {
            await new db.mongodb.CRUD('twitter', 'requests').insert({
                requestID: follow.requestID,
                requester: follow.myUserID,
                reciever: follow.yourUserID,
            });

            return {
                message: 'Takip isteği gönderildi.',
                requestID: follow.requestID
            };
        }

        let follows = await new db.mongodb.CRUD('twitter', 'follows').insert({
            followID: follow.followID,
            follower: follow.myUserID,
            following: follow.yourUserID
        });

        if (follows !== false) {
            if (follows.length > 0) {
                return follow.followID;
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};

module.exports.getRequests = async (myUserID) => {
    try {
        console.log(JSON.stringify(myUserID));
        let request = await new db.mongodb.CRUD('twitter', 'requests').aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'requester',
                    'foreignField': 'userID',
                    'as': 'match'
                }
            }, {
                '$project': {
                    'match.name': true,
                    'match.profilePhoto': true,
                    'match.nickname': true
                }
            }
        ]);

        if (request != false) {
            if (request.length > 0) {
                return request;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.acceptFollowRequest = async (okeyRequest) => {
    try {
        let followRequest = await new db.mongodb.CRUD('twitter', 'follows').insert({
            followID: okeyRequest.followID,
            follower: okeyRequest.following,
            following: okeyRequest.follower
        });

        let deleteRequest = await new db.mongodb.CRUD('twitter', 'requests').delete({ requestID: okeyRequest.requestID },
        );
        console.log('requests collectionsundan kadlırıldı', deleteRequest);

        if (followRequest !== false) {
            if (followRequest.length > 0) {
                return {
                    message: 'Takip isteği kabul edildi.',
                    requestID: okeyRequest.followID
                };
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};

module.exports.deleteFollowRequest = async (okeyRequest) => {
    try {

        let deleteRequest = await new db.mongodb.CRUD('twitter', 'requests').delete({ requestID: okeyRequest.requestID },
        );
        console.log('requests collectionsundan kadlırıldı', deleteRequest);

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};
module.exports.deleteFollow = async (followID) => {
    try {
        let deleteResult = await new db.mongodb.CRUD('twitter', 'follows').delete({ followID: followID.followID },
        );

        if (deleteResult !== false) {
            if (deleteResult.length > 0) {
                const followID = deleteResult[0].followID;
                return {
                    error: 'Takipten çıkıldı',
                    followID: followID
                };
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};



module.exports.getFollower = async (myUserID) => {
    try {
        console.log(JSON.stringify(myUserID));
        let follower = await new db.mongodb.CRUD('twitter', 'follows').aggregate([
            {
                '$match': {
                    'following': myUserID.following
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'follower',
                    'foreignField': 'userID',
                    'as': 'match'
                }
            }, {
                '$project': {
                    'match.name': true,
                    'match.userID': true,
                    'match.nickname': true
                }
            }
        ]);

        if (follower != false) {
            if (follower.length > 0) {
                return follower;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getFollowing = async (myUserID) => {
    try {
        console.log(JSON.stringify(myUserID));
        let follower = await new db.mongodb.CRUD('twitter', 'follows').aggregate([
            {
                '$match': {
                    'follower': myUserID.follower
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'following',
                    'foreignField': 'userID',
                    'as': 'match'
                }
            }, {
                '$project': {
                    'match.name': true,
                    'match.userID': true,
                    'match.nickname': true
                }
            }
        ]);

        if (follower != false) {
            if (follower.length > 0) {
                return follower;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};
// message (soket.io) ve usertype a bak ona göre kodu düzenle

module.exports.updateUser = async (user) => {
    try {
        let updateResult = await new db.mongodb.CRUD('twitter', 'users').update({ userID: user.userID },
            {
                $set: {
                    email: user.email,
                    userType: user.userType,
                    name: user.name,
                    nickname: user.nickname,
                    birthday: user.birthday,
                    profilePhoto: user.profilePhoto,
                    profileHeaderPhoto: user.profileHeaderPhoto,
                    bio: user.bio
                }
            });

        if (updateResult !== false) {
            if (updateResult.modifiedCount > 0) {
                return user;
            }
            return null;
        }

        if (updateResult.modifiedCount === 0) {
            console.log('Güncelleme işlemi başarısız oldu.');


        }

        return false;
    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};

module.exports.updatePassword = async (passwordInfo) => {
    try {
        console.log('AAAAAAAAAAA');
        let currentPassword = await new db.mongodb.CRUD('twitter', 'users').find({
            userID: passwordInfo.userID,
            password: passwordInfo.currentPassword
        });

        if (currentPassword.length > 0) {
            console.log('BBBBBBBBBBBBBBBBB');

            if (passwordInfo.newPassword !== passwordInfo.verificationPassword || passwordInfo.newPassword === passwordInfo.currentPassword) {
                console.log('dddddddddddddd');
                return false;
            }

            if (passwordInfo.newPassword === passwordInfo.verificationPassword) {
                console.log('CCCCCCCCCCCCCCCCCC');
                let newPassword = await new db.mongodb.CRUD('twitter', 'users').update(
                    { userID: passwordInfo.userID },
                    { $set: { password: passwordInfo.newPassword } }
                );

                if (newPassword.modifiedCount > 0) {
                    console.log('EEEEEEEEEEEEEE');
                    return newPassword;
                }
                return false;
            }

            return false;
        }

        return false;
    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};



module.exports.deleteUser = async (user) => {
    try {
        let deleteResult = await new db.mongodb.CRUD('twitter', 'users').delete({ userID: user.userID },
        );

        if (deleteResult !== false) {
            if (deleteResult.length > 0) {
                return deleteResult[0];
            }
            return null;
        }


        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};


module.exports.getUserInfo = async (user) => {
    try {
        console.log(JSON.stringify(user));
        let query = await new db.mongodb.CRUD('twitter', 'users').find(user, [0, 1], { password: false, userID: false });

        if (query !== false) {
            if (query.length > 0) {
                return query[0];
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};