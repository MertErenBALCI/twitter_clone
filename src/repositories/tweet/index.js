const helpers = require('../../helpers');
const db = require('../../db');
// const constants = require('../../constants');


module.exports.randomId = () => {
    let randomId = db.mongodb.id();

    return randomId;
};

module.exports.getUserTweets = async (userTweets) => {
    try {
        console.log(JSON.stringify(userTweets));
        let isBlocked = await new db.mongodb.CRUD('twitter', 'follows').find({


            myUserID: userTweets.myUserID,
            yourUserID: userTweets.yourUserID,
        });

        if ((isBlocked && isBlocked.length > 0)) {
            return false;

        }

        let isUserTypeTrue = await new db.mongodb.CRUD('twitter', 'users').find({

            userID: userTweets.yourUserID,
            userType: true
        }
        );
        if ((isUserTypeTrue && isUserTypeTrue.length > 0)) {
            let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
                follower: userTweets.myUserID,
                following: userTweets.yourUserID,
            }
            );

            if ((isFollow && isFollow.length > 0) || userTweets.myUserID == userTweets.yourUserID) {
                let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
                    {
                        '$match': {
                            'userID': userTweets.yourUserID,
                        }
                    }, {
                        '$project': {
                            'password': false
                        }
                    }, {
                        '$lookup': {
                            'from': 'tweet',
                            'localField': 'userID',
                            'foreignField': 'userID',
                            'pipeline': [
                                {
                                    '$match': {
                                        'tweetType': {
                                            '$in': [
                                                1, 3, 4
                                            ]
                                        }
                                    }
                                }, {
                                    '$lookup': {
                                        'from': 'tweet',
                                        'localField': 'belongTo',
                                        'foreignField': 'tweetID',
                                        'as': 'relatedTweets'
                                    }
                                }, {
                                    '$addFields': {
                                        'relatedTweets': {
                                            '$cond': {
                                                'if': {
                                                    '$in': [
                                                        '$tweetType', [
                                                            3, 4
                                                        ]
                                                    ]
                                                },
                                                'then': '$relatedTweets',
                                                'else': []
                                            }
                                        }
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$relatedTweets',
                                        'preserveNullAndEmptyArrays': true
                                    }
                                }, {
                                    '$lookup': {
                                        'from': 'users',
                                        'localField': 'relatedTweets.userID',
                                        'foreignField': 'userID',
                                        'as': 'relatedTweets.userDetails'
                                    }
                                }, {
                                    '$addFields': {
                                        'relatedTweets.userDetails': {
                                            '$cond': {
                                                'if': {
                                                    '$eq': [
                                                        '$userType', 1
                                                    ]
                                                },
                                                'then': [],
                                                'else': '$relatedTweets.userDetails'
                                            }
                                        }
                                    }
                                }, {
                                    '$project': {
                                        'relatedTweets.userDetails.userType': 0,
                                        'relatedTweets.userDetails.email': 0,
                                        'relatedTweets.userDetails.created_Date_time': 0,
                                        'relatedTweets.userDetails.birthday': 0,
                                        'relatedTweets.userDetails.profileHeaderPhoto': 0,
                                        'relatedTweets.userDetails.bio': 0,
                                        'relatedTweets.userDetails.followerSize': 0,
                                        'relatedTweets.userDetails.followingSize': 0,
                                        'relatedTweets.userDetails.password': 0
                                    }
                                },

                                { '$skip': userTweets.skip },
                                { '$limit': userTweets.limit }
                            ],
                            'as': 'tweets'
                        }
                    }
                ]);

                if (query !== false) {
                    if (query.length > 0) {
                        return query;
                    }
                    return null;
                }

            }

            return false;
        }

        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': userTweets.yourUserID,
                }
            }, {
                '$project': {
                    'password': false
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': {
                                    '$in': [
                                        1, 3, 4
                                    ]
                                }
                            }
                        }, {
                            '$lookup': {
                                'from': 'tweet',
                                'localField': 'belongTo',
                                'foreignField': 'tweetID',
                                'as': 'relatedTweets'
                            }
                        }, {
                            '$addFields': {
                                'relatedTweets': {
                                    '$cond': {
                                        'if': {
                                            '$in': [
                                                '$tweetType', [
                                                    3, 4
                                                ]
                                            ]
                                        },
                                        'then': '$relatedTweets',
                                        'else': []
                                    }
                                }
                            }
                        }, {
                            '$unwind': {
                                'path': '$relatedTweets',
                                'preserveNullAndEmptyArrays': true
                            }
                        }, {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'relatedTweets.userID',
                                'foreignField': 'userID',
                                'as': 'relatedTweets.userDetails'
                            }
                        }, {
                            '$addFields': {
                                'relatedTweets.userDetails': {
                                    '$cond': {
                                        'if': {
                                            '$eq': [
                                                '$userType', 1
                                            ]
                                        },
                                        'then': [],
                                        'else': '$relatedTweets.userDetails'
                                    }
                                }
                            }
                        }, {
                            '$project': {
                                'relatedTweets.userDetails.userType': 0,
                                'relatedTweets.userDetails.email': 0,
                                'relatedTweets.userDetails.created_Date_time': 0,
                                'relatedTweets.userDetails.birthday': 0,
                                'relatedTweets.userDetails.profileHeaderPhoto': 0,
                                'relatedTweets.userDetails.bio': 0,
                                'relatedTweets.userDetails.followerSize': 0,
                                'relatedTweets.userDetails.followingSize': 0,
                                'relatedTweets.userDetails.password': 0
                            }
                        }, {
                            '$group': {
                                '_id': '$_id',
                                'tweets': {
                                    '$push': '$$ROOT'
                                }
                            }
                        }
                    ],
                    'as': 'tweets'
                }
            }
        ]);

        if (query !== false) {
            if (query.length > 0) {
                return query;
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getUserComments = async (userTweets) => {
    try {
        console.log(JSON.stringify(userTweets));

        let isUserTypeTrue = await new db.mongodb.CRUD('twitter', 'users').find({

            userID: userTweets.yourUserID,
            userType: true
        }
        );

        if ((isUserTypeTrue && isUserTypeTrue.length > 0)) {

            let isFollow = await new db.mongodb.CRUD('twitter', 'follows').find({
                follower: userTweets.myUserID,
                following: userTweets.yourUserID,
            }
            );

            if ((isFollow && isFollow.length > 0) || userTweets.myUserID == userTweets.yourUserID) {
                let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
                    {
                        '$match': {
                            'userID': userTweets.yourUserID,
                        }
                    }, {
                        '$project': {
                            'password': false
                        }
                    }, {
                        '$lookup': {
                            'from': 'tweet',
                            'localField': 'userID',
                            'foreignField': 'userID',
                            'pipeline': [
                                {
                                    '$match': {
                                        'tweetType': {
                                            '$in': [
                                                2
                                            ]
                                        }
                                    }
                                }, {
                                    '$lookup': {
                                        'from': 'tweet',
                                        'let': {
                                            'belongToTweetID': '$belongTo'
                                        },
                                        'pipeline': [
                                            {
                                                '$match': {
                                                    '$expr': {
                                                        '$eq': [
                                                            '$tweetID', '$$belongToTweetID'
                                                        ]
                                                    }
                                                }
                                            }, {
                                                '$lookup': {
                                                    'from': 'users',
                                                    'localField': 'userID',
                                                    'foreignField': 'userID',
                                                    'as': 'userDetails'
                                                }
                                            }, {
                                                '$project': {
                                                    'userDetails.userType': 0,
                                                    'userDetails.email': 0,
                                                    'userDetails.created_Date_time': 0,
                                                    'userDetails.birthday': 0,
                                                    'userDetails.profileHeaderPhoto': 0,
                                                    'userDetails.bio': 0,
                                                    'userDetails.followerSize': 0,
                                                    'userDetails.followingSize': 0,
                                                    'userDetails.password': 0
                                                }
                                            }
                                        ],
                                        'as': 'relatedTweets'
                                    }
                                }, {
                                    '$addFields': {
                                        'relatedTweets': {
                                            '$cond': {
                                                'if': {
                                                    '$in': [
                                                        '$tweetType', [
                                                            2
                                                        ]
                                                    ]
                                                },
                                                'then': '$relatedTweets',
                                                'else': []
                                            }
                                        }
                                    }
                                },

                                { '$skip': userTweets.skip },
                                { '$limit': userTweets.limit }
                            ],
                            'as': 'tweets'
                        }
                    }
                ]);

                if (query !== false) {
                    if (query.length > 0) {
                        return query;
                    }
                    return null;
                }

            }

            return false;

        }

        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': userTweets.yourUserID,
                }
            }, {
                '$project': {
                    'password': false
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': {
                                    '$in': [
                                        2
                                    ]
                                }
                            }
                        }, {
                            '$lookup': {
                                'from': 'tweet',
                                'let': {
                                    'belongToTweetID': '$belongTo'
                                },
                                'pipeline': [
                                    {
                                        '$match': {
                                            '$expr': {
                                                '$eq': [
                                                    '$tweetID', '$$belongToTweetID'
                                                ]
                                            }
                                        }
                                    }, {
                                        '$lookup': {
                                            'from': 'users',
                                            'localField': 'userID',
                                            'foreignField': 'userID',
                                            'as': 'userDetails'
                                        }
                                    }, {
                                        '$project': {
                                            'userDetails.userType': 0,
                                            'userDetails.email': 0,
                                            'userDetails.created_Date_time': 0,
                                            'userDetails.birthday': 0,
                                            'userDetails.profileHeaderPhoto': 0,
                                            'userDetails.bio': 0,
                                            'userDetails.followerSize': 0,
                                            'userDetails.followingSize': 0,
                                            'userDetails.password': 0
                                        }
                                    }
                                ],
                                'as': 'relatedTweets'
                            }
                        }, {
                            '$addFields': {
                                'relatedTweets': {
                                    '$cond': {
                                        'if': {
                                            '$in': [
                                                '$tweetType', [
                                                    2
                                                ]
                                            ]
                                        },
                                        'then': '$relatedTweets',
                                        'else': []
                                    }
                                }
                            }
                        }
                    ],
                    'as': 'tweets'
                }
            }
        ]);

        if (query !== false) {
            if (query.length > 0) {
                return query;
            }
            return null;
        }

        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};
module.exports.getHomePage = async (Tweets) => {
    try {
        console.log(JSON.stringify(Tweets));

        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': Tweets.userID
                }
            }, {
                '$project': {
                    'userID': true,
                    'name': true,
                    'nickname': true,
                    'profilePhoto': true
                }
            }, {
                '$lookup': {
                    'from': 'follows',
                    'localField': 'userID',
                    'foreignField': 'follower',
                    'pipeline': [
                        {
                            '$lookup': {
                                'from': 'tweet',
                                'localField': 'following',
                                'foreignField': 'userID',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'tweetType': {
                                                '$in': [1, 2, 3, 4]
                                            }
                                        }
                                    },
                                    {
                                        '$lookup': {
                                            'from': 'users',
                                            'localField': 'userID',
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
                                    },
                                    {
                                        '$lookup': {
                                            'from': 'tweet',
                                            'localField': 'belongTo',
                                            'foreignField': 'tweetID',
                                            'pipeline': [
                                                {
                                                    '$lookup': {
                                                        'from': 'users',
                                                        'localField': 'userID',
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
                                            'as': 'belongToDetails'
                                        }
                                    }
                                ],
                                'as': 'userTweets'
                            }
                        },

                        { '$skip': Tweets.skip },
                        { '$limit': Tweets.limit }
                    ],
                    'as': 'follow'
                }
            }
        ]);

        if (query !== false) {
            if (query.length > 0) {
                return query;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getProfilePage = async (ProfilePage) => {
    try {
        console.log(JSON.stringify(ProfilePage));
        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': ProfilePage.userID
                }
            }, {
                '$project': {
                    'userID': true,
                    'name': true,
                    'nickname': true,
                    'profilePhoto': true,
                    'profileHeaderPhoto': true,
                    'bio': true,
                    'created_Date_time': true,
                    'followingSize': true,
                    'followerSize': true
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': {
                                    '$in': [
                                        1, 4, 5
                                    ]
                                }
                            }
                        },

                        { '$skip': ProfilePage.skip },
                        { '$limit': ProfilePage.limit }
                    ],
                    'as': 'result'
                }
            }
        ]);

        if (query !== false) {
            if (query.length > 0) {
                return query;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};
module.exports.getTweetComments = async (TweetComments) => {
    try {
        console.log(JSON.stringify(TweetComments));
        let comments = await new db.mongodb.CRUD('twitter', 'tweet').aggregate([
            {
                '$match': {
                    'tweetID': TweetComments.tweetID,

                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'tweetID',
                    'foreignField': 'tweetID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': 2
                            }
                        }, {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'userID',
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
                                'as': 'user'
                            }
                        },

                        { '$skip': TweetComments.skip },
                        { '$limit': TweetComments.limit }
                    ],
                    'as': 'match'
                }
            }
        ]);


        if (comments !== false) {
            if (comments.length > 0) {
                return comments;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getTweetLikers = async (TweetLikers) => {
    try {
        console.log(JSON.stringify(TweetLikers));
        let likers = await new db.mongodb.CRUD('twitter', 'tweet').aggregate([
            {
                '$match': {
                    'tweetID': TweetLikers.tweetID
                }
            }, {
                '$lookup': {
                    'from': 'likes',
                    'localField': 'tweetID',
                    'foreignField': 'tweetID',
                    'pipeline': [
                        {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'userID',
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
                        },

                        { '$skip': TweetLikers.skip },
                        { '$limit': TweetLikers.limit }
                    ],
                    'as': 'like'
                }
            }
        ]);


        if (likers !== false) {
            if (likers.length > 0) {
                return likers;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};
module.exports.getMyLike = async (myLike) => {
    try {
        console.log(JSON.stringify(myLike));
        let likers = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': myLike.userID
                }
            }, {
                '$project': {
                    'userID': true
                }
            }, {
                '$lookup': {
                    'from': 'likes',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'pipeline': [
                        {
                            '$lookup': {
                                'from': 'tweet',
                                'localField': 'tweetID',
                                'foreignField': 'tweetID',
                                'pipeline': [
                                    {
                                        '$lookup': {
                                            'from': 'users',
                                            'localField': 'userID',
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
                                            'as': 'UserDetails'
                                        }
                                    }
                                ],
                                'as': 'LikedTweet'
                            }
                        },

                        { '$skip': myLike.skip },
                        { '$limit': myLike.limit }
                    ],
                    'as': 'LikedTweetID'
                }
            }
        ]);


        if (likers !== false) {
            if (likers.length > 0) {
                return likers;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};
module.exports.getTweetRetweeters = async (TweetRetweeters) => {
    try {
        console.log(JSON.stringify(TweetRetweeters));
        let reTweeters = await new db.mongodb.CRUD('twitter', 'tweet').aggregate([
            {
                '$match': {
                    'tweetID': TweetRetweeters.tweetID
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'reTweeters',
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
                        },

                        { '$skip': TweetRetweeters.skip },
                        { '$limit': TweetRetweeters.limit }
                    ],
                    'as': 'reTweetersDetails'
                }
            }
        ]);

        if (reTweeters !== false) {
            if (reTweeters.length > 0) {
                return reTweeters;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getTweetQuote = async (TweetQuote) => {
    try {
        console.log(JSON.stringify(TweetQuote));
        let reTweeters = await new db.mongodb.CRUD('twitter', 'tweet').aggregate([
            {
                '$match': {
                    'tweetID': TweetQuote.tweetID
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'tweetID',
                    'foreignField': 'belongTo',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': 4
                            }
                        }, {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'userID',
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
                        },

                        { '$skip': TweetQuote.skip },
                        { '$limit': TweetQuote.limit }
                    ],
                    'as': 'Quotes'
                }
            }
        ]);

        if (reTweeters !== false) {
            if (reTweeters.length > 0) {
                return reTweeters;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.getTweetCommenttoComments = async (TweetComments) => {
    try {
        console.log(JSON.stringify(TweetComments));
        let commenttoComment = await new db.mongodb.CRUD('twitter', 'tweet').aggregate([
            {
                '$match': {
                    'tweetID': TweetComments.tweetID,
                    'tweetType': 1
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'tweetID',
                    'foreignField': 'tweetID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': 2
                            }
                        }, {
                            '$lookup': {
                                'from': 'tweet',
                                'localField': 'commentID',
                                'foreignField': 'tweetID',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'tweetType': 3
                                        }
                                    }, {
                                        '$lookup': {
                                            'from': 'users',
                                            'localField': 'userID',
                                            'foreignField': 'userID',
                                            'pipeline': [
                                                {
                                                    '$project': {
                                                        'userID': true,
                                                        'name': true,
                                                        'nickname': true,
                                                        'profilePhoto': true
                                                    }
                                                }
                                            ],
                                            'as': 'user'
                                        }
                                    }
                                ],
                                'as': 'commenttoComment'
                            }
                        }
                    ],
                    'as': 'comment'
                }
            }
        ]);


        if (commenttoComment !== false) {
            if (commenttoComment.length > 0) {
                return commenttoComment;
            }
            return null;
        }
        return false;
    } catch (error) {
        helpers.error.logger(error);
        return false;
    }
};

module.exports.postTweet = async (tweet) => {
    try {

        let tweets = await new db.mongodb.CRUD('twitter', 'tweet').insert(tweet);

        if (tweets !== false) {
            if (tweets.length > 0) {
                return tweets[0];
            }
            return null;
        }
        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.updateTweet = async (updateTweet) => {
    try {

        let updatedTweet = await new db.mongodb.CRUD('twitter', 'tweet').update({ tweetID: updateTweet.tweetID },
            {
                $set: {
                    tweet: updateTweet.tweet
                }
            });

        if (updatedTweet !== false) {
            if (updatedTweet.modifiedCount > 0) {
                return updateTweet;
            }
            return null;
        }

        if (updatedTweet.modifiedCount === 0) {
            console.log('Güncelleme işlemi başarısız oldu.');
            return ({ message: 'aaa' });
        }

        return false;
    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};

module.exports.deleteTweet = async (deleteTweet) => {
    try {
        let deletedTweet = await new db.mongodb.CRUD('twitter', 'tweet').delete({ userID: deleteTweet.userID, tweetID: deleteTweet.tweetID },
        );
        if (deleteTweet.tweetType == 1) {

            if (deletedTweet !== false) {
                if (deletedTweet.length > 0) {
                    return deletedTweet[0];
                }
                return null;
            }
        }

        if (deleteTweet.tweetType == 2) {
            let updateTweet = new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: deleteTweet.belongTo },
                {
                    $pull: { commenters: deleteTweet.userID },
                    $inc: { commentSize: -1 }
                }
            );
            console.log(updateTweet, 'AAAAAAAAAAAAAAAAAAAAA');

            if (deletedTweet !== false) {
                if (deletedTweet.length > 0) {
                    return deletedTweet[0];
                }
                return null;
            }
        }

        if (deleteTweet.tweetType == 3) {
            let reTweet = await new db.mongodb.CRUD('twitter', 'tweet').find(
                {
                    tweetID: deleteTweet.tweetID,
                    userID: deleteTweet.userID,
                    tweetType: 3
                }
            );

            if (reTweet) {
                let deleteRetweets = await new db.mongodb.CRUD('twitter', 'tweet').delete({ tweetID: deleteTweet.tweetID });
                console.log(deleteRetweets);
                let updateSize = new db.mongodb.CRUD('twitter', 'tweet').update(
                    { tweetID: deleteTweet.belongTo },
                    {
                        $pull: { reTweeters: deleteTweet.userID },
                        $inc: { reTweetSize: -1 }
                    }
                );
                console.log(updateSize, 'AAAAAAAAAAAAAAAA');
            }
            if (reTweet !== false) {
                if (reTweet.length > 0) {
                    return reTweet[0];
                }
                return null;
            }
        }

        if (deleteTweet.tweetType == 4) {
            let updateTweet = new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: deleteTweet.belongTo },
                {
                    $pull: { quoters: deleteTweet.userID },
                    $inc: { quotersSize: -1 }
                }
            );
            console.log(updateTweet, 'AAAAAAAAAAAAAAAAAAAAA');

            if (deletedTweet !== false) {
                if (deletedTweet.length > 0) {
                    return deletedTweet[0];
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

module.exports.postComment = async (comment) => {
    try {

        let comments = await new db.mongodb.CRUD('twitter', 'tweet').insert(comment);

        let updateTweet = new db.mongodb.CRUD('twitter', 'tweet').update(
            { tweetID: comment.belongTo },
            {
                $push: { commenters: comment.userID },
                $inc: { commentSize: 1 }
            }
        );
        console.log(updateTweet, 'AAAAAAAAAAAAAAAAAAAAA');

        if (comments !== false) {
            if (comments.length > 0) {
                return comments[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};
module.exports.postQuote = async (quote) => {
    try {

        let quotes = await new db.mongodb.CRUD('twitter', 'tweet').insert(quote);

        if (quotes) {
            let updateSize = new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: quote.belongTo },
                {
                    $push: { quoters: quote.userID },
                    $inc: { quotersSize: 1 }
                }
            );
            console.log(updateSize);
        }

        if (quotes !== false) {
            if (quotes.length > 0) {
                return quotes[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.postRetweet = async (reTweet) => {
    try {

        let isreTweeted = await new db.mongodb.CRUD('twitter', 'tweet').find(
            {
                belongTo: reTweet.belongTo,
                userID: reTweet.userID,
                tweetType: 3
            }
        );

        if (isreTweeted.length > 0) {
            console.log('User has already retweeted.');
            return false;
        }


        if (isreTweeted.length == 0) {
            let reTweets = await new db.mongodb.CRUD('twitter', 'tweet').insert(reTweet);
            let reTweetSize = new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: reTweet.belongTo },
                {
                    $push: {
                        reTweeters: reTweet.userID
                    },
                    $inc: {
                        reTweetSize: 1
                    }
                }
            );
            console.log(reTweetSize);

            if (reTweets !== false) {
                if (reTweets.length > 0) {
                    return reTweets[0];
                }
                return null;
            }
        }
        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.postLike = async (like) => {
    try {
        let isliked = await new db.mongodb.CRUD('twitter', 'likes').find({ tweetID: like.tweetID, userID: like.userID });

        if (isliked.length > 0) {
            return false;
        }

        if (isliked.length == 0) {
            let likes = await new db.mongodb.CRUD('twitter', 'likes').insert(like);
            let likeSize = new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: like.tweetID },
                {
                    $inc: {
                        likeSize: 1
                    }
                }
            );
            console.log(likeSize);

            if (likes !== false) {
                if (likes.length > 0) {
                    return likes[0];
                }
                return null;
            }
        }
        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.deleteLike = async (deleteLike) => {
    try {
        let deleteLikes = await new db.mongodb.CRUD('twitter', 'likes').delete({ likedID: deleteLike.likedID });

        new db.mongodb.CRUD('twitter', 'tweet').update(
            { tweetID: deleteLike.tweetID },
            {
                $inc: { likeSize: -1 }
            }
        );

        if (deleteLikes !== false) {
            if (deleteLikes.length > 0) {
                return deleteLikes[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};
