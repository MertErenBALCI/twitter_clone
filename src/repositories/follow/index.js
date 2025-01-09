const helpers = require('../../helpers');
const db = require('../../db');
// const constants = require('../../constants');


module.exports.randomId = () => {
    let randomId = db.mongodb.id();

    return randomId;
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
                created_at: follow.created_at
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

        let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: follow.yourUserID }, {
            $inc: { followerSize: 1 }
        });

        let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: follow.myUserID }, {
            $inc: { followingSize: 1 }
        });
        console.log(followerSize, followingSize);
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
                '$match': {
                    'reciever': myUserID.myUserID
                }
            }, {
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
            },

            { '$skip': myUserID.skip },
            { '$limit': myUserID.limit }
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

module.exports.getMyLikedTweets = async (myUserID) => {
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

        let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: okeyRequest.follower }, {

            $inc: { followerSize: 1 }
        });
        let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: okeyRequest.following }, {

            $inc: { followingSize: 1 }
        });


        console.log(followerSize);
        console.log(followingSize);

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

module.exports.deleteFollowRequest = async (deleteRequest) => {
    try {

        let isDeleteRequest = await new db.mongodb.CRUD('twitter', 'requests').delete({ requestID: deleteRequest.requestID },
        );
        console.log('requests collectionsundan kadlırıldı', isDeleteRequest);

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


        let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: followID.myUserID }, {

            $inc: { followingSize: -1 }
        });

        let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: followID.yourUserID }, {

            $inc: { followerSize: -1 }
        });

        console.log(followingSize);
        console.log(followerSize);


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

module.exports.deleteFollower = async (followID) => {
    try {

        let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
            follower: followID.yourUserID,
            following: followID.myUserID
        });

        if (isFollow && isFollow.length > 0) {
            let deleteResult = await new db.mongodb.CRUD('twitter', 'follows').delete({ followID: followID.followID },
            );

            let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: followID.yourUserID }, {

                $inc: { followingSize: -1 }
            });

            let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: followID.myUserID }, {

                $inc: { followerSize: -1 }
            });

            console.log(followingSize);
            console.log(followerSize);

            if (deleteResult !== false) {
                if (deleteResult.length > 0) {
                    const followID = deleteResult[0].followID;
                    return {
                        error: 'Takipten çıkarıldı',
                        followID: followID
                    };
                }
                return null;
            }
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
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

        let followerSize = await new db.mongodb.CRUD('twitter', 'users').update({ userID: follow.yourUserID }, {

            $inc: { followerSize: 1 }
        });
        let followingSize = await new db.mongodb.CRUD('twitter', 'users').update({ userID: follow.myUserID }, {

            $inc: { followingSize: 1 }

        });
        console.log(followerSize, followingSize);
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
            },

            { '$skip': myUserID.skip },
            { '$limit': myUserID.limit }
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

module.exports.
    getFollowing = async (myUserID) => {
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
                },

                { '$skip': myUserID.skip },
                { '$limit': myUserID.limit }
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