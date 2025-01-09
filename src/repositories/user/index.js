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

module.exports.isThere = async (email, nickname) => {

    let isThereEmail = await new db.mongodb.CRUD('twitter', 'users').find({ email });
    if (isThereEmail.length > 0) {

        return false;
    }

    let isThereNickname = await new db.mongodb.CRUD('twitter', 'users').find({ nickname });
    if (isThereNickname.length > 0) {

        return false;
    }

    return true;

};

module.exports.randomId = () => {
    let randomId = db.mongodb.id();

    return randomId;
};


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
                    bio: user.bio,
                    updated_at: user.updated_at
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
        let currentPassword = await new db.mongodb.CRUD('twitter', 'users').find({
            userID: passwordInfo.userID,
            password: passwordInfo.currentPassword
        });

        if (currentPassword.length > 0) {
            if (passwordInfo.newPassword === passwordInfo.verificationPassword) {
                let newPassword = await new db.mongodb.CRUD('twitter', 'users').update(
                    { userID: passwordInfo.userID },
                    { $set: { password: passwordInfo.newPassword, updated_password: passwordInfo.updated_password } }
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

module.exports.postBlock = async (user) => {
    try {
        let block = await new db.mongodb.CRUD('twitter', 'block').insert(user);

        if ((block && block.length > 0)) {
            let isFollowing = await new db.mongodb.CRUD('twitter', 'follows').find({
                follower: user.myUserID,
                following: user.yourUserID,
            });

            let isFollower = await new db.mongodb.CRUD('twitter', 'follows').find({
                following: user.myUserID,
                follower: user.yourUserID,
            });

            let deleteFollows = await new db.mongodb.CRUD('twitter', 'follows').delete({
                $or: [
                    {
                        follower: user.myUserID,
                        following: user.yourUserID,
                    },
                    {
                        following: user.myUserID,
                        follower: user.yourUserID,
                    }
                ]

            });
            console.log(deleteFollows);

            if (isFollowing && isFollowing.length > 0) {

                let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: user.myUserID }, {

                    $inc: { followingSize: -1 }
                });

                let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: user.yourUserID }, {

                    $inc: { followerSize: -1 }
                });

                console.log(followingSize);
                console.log(followerSize);

                if (block !== false) {
                    if (block.length > 0) {
                        const followID = block[0].followID;
                        return {
                            error: 'Kullanıcı engellendi',
                            followID: followID
                        };
                    }
                    return null;
                }
            }

            if (isFollower && isFollower.length > 0) {

                let followingSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: user.yourUserID }, {

                    $inc: { followingSize: -1 }
                });

                let followerSize = new db.mongodb.CRUD('twitter', 'users').update({ userID: user.myUserID }, {

                    $inc: { followerSize: -1 }
                });

                console.log(followingSize);
                console.log(followerSize);

                if (block !== false) {
                    if (block.length > 0) {
                        return block[0];
                    }
                    return null;
                }
            }

        }

        if (block !== false) {
            if (block.length > 0) {
                return block[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};

module.exports.deleteBlock = async (user) => {
    try {
        console.log(JSON.stringify(user));
        let query = await new db.mongodb.CRUD('twitter', 'users').delete({ blockedID: user.blockedID },
        );

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
module.exports.getBlocked = async (user) => {
    try {
        console.log(JSON.stringify(user));
        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': user.userID
                }
            }, {
                '$project': {
                    'userID': true
                }
            }, {
                '$lookup': {
                    'from': 'block',
                    'localField': 'userID',
                    'foreignField': 'myUserID',
                    'pipeline': [
                        {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'yourUserID',
                                'foreignField': 'userID',
                                'pipeline': [
                                    {
                                        '$project': {
                                            'userID': true,
                                            'name': true,
                                            'nickname': true,
                                            'profilePhoto': true,
                                            '_id': false
                                        }
                                    }
                                ],
                                'as': 'userDetails'
                            }
                        }
                    ],
                    'as': 'postBlockedUser'
                }
            }
        ]);

        if (query !== false) {
            if (query.length > 0) {
                return query[0, 0];
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
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

function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); // türkçe karakter normalizasyonu
}

module.exports.postSearch = async (search) => {
    try {

        let temizlenmisNickname = normalizeString(search.nickname.replace(/ /g, '')); //boşluk kaldırma

        let regexPattern = new RegExp(temizlenmisNickname, 'i'); // 'i' flag büyük/küçük harf duyarsız arama yapar

        let kullaniciVarMi = await new db.mongodb.CRUD('twitter', 'users')
            .find({ nickname: { $regex: regexPattern } }, [search.skip, search.limit], { userID: true, nickname: true });

        if (kullaniciVarMi !== false) {
            if (kullaniciVarMi.length > 0) {

                kullaniciVarMi.sort((a, b) => a.nickname.localeCompare(b.nickname));//  alfabatik sıralama

                return kullaniciVarMi;
            }
            return null;
        }
        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

