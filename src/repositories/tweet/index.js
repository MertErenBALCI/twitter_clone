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
        let query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
            {
                '$match': {
                    'userID': userTweets.userID
                }
            }, {
                '$lookup': {
                    'from': 'tweet',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'pipeline': [
                        {
                            '$match': {
                                'tweetType': 1
                            }
                        }
                    ],
                    'as': 'match'
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
                                'from': 'users',
                                'localField': 'userID',
                                'foreignField': 'userID',
                                'as': 'user'
                            }
                        }
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

        if (deletedTweet !== false) {
            if (deletedTweet.length > 0) {
                return deletedTweet[0];
            }
            return null;
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
            await new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: quote.tweetID },
                {
                    $push: { quoters: quote.userID },
                    $inc: { quotersSize: 1 }
                }
            );
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

module.exports.deleteQuote = async (deleteQuote) => {

    try {

        let isQuoted = await new db.mongodb.CRUD('twitter', 'tweets').find(
            {
                userID: deleteQuote.userID,
                quoteID: deleteQuote.quoteID
            }
            ,
            [0, 1]
        );

        if (isQuoted) {
            let deleteQuotes = await new db.mongodb.CRUD('twitter', 'tweet').delete({ quoteID: deleteQuote.quoteID });
            console.log(deleteQuotes);
            await new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: deleteQuote.tweetID },
                {
                    $inc: { likeSize: -1 }
                }
            );
        }
        if (isQuoted !== false) {
            if (isQuoted.length > 0) {
                return isQuoted[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};


module.exports.postRetweet = async (reTweet) => {
    try {

        let isreTweeted = await new db.mongodb.CRUD('twitter', 'tweet').find(
            {
                tweetID: reTweet.tweetID,
                reTweeters: reTweet.userID
            },
            [0, 1]
        );

        console.log(isreTweeted);

        if (isreTweeted.length > 0) {
            console.log('User has already retweeted.');
            return false;
        }


        else if (isreTweeted == false) {
            console.log('VBBBBBBBBBBB');
            let reTweets = await new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: reTweet.tweetID },
                {
                    $push: {
                        reTweeters: reTweet.userID
                    },
                    $inc: {
                        reTweetSize: 1
                    }
                }
            );

            console.log(reTweets, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

            if (reTweets) {

                return reTweets;
            }
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
    }
};

module.exports.deleteRetweet = async (deleteRetweet) => {
    try {

        let tweet = await new db.mongodb.CRUD('twitter', 'tweet').find(
            {
                tweetID: deleteRetweet.tweetID,
                reTweeters: deleteRetweet.userID
            }
            ,
            [0, 1]
        );

        if (tweet) {
            await new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: deleteRetweet.tweetID },
                {
                    $pull: { reTweeters: deleteRetweet.userID },
                    $inc: { reTweetSize: -1 }
                }
            );
        }
        if (tweet !== false) {
            if (tweet.length > 0) {
                return tweet[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
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
            let likeSize = await new db.mongodb.CRUD('twitter', 'tweet').update(
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

        let isliked = await new db.mongodb.CRUD('twitter', 'likes').find(
            {
                userID: deleteLike.userID,
                tweetID: deleteLike.tweetID
            }
            ,
            [0, 1]
        );

        if (isliked) {
            let deleteLikes = await new db.mongodb.CRUD('twitter', 'likes').delete({ likedID: deleteLike.likedID });
            console.log(deleteLikes);
            await new db.mongodb.CRUD('twitter', 'tweet').update(
                { tweetID: deleteLike.tweetID },
                {
                    $inc: { likeSize: -1 }
                }
            );
        }
        if (isliked !== false) {
            if (isliked.length > 0) {
                return isliked[0];
            }
            return null;
        }

        return false;

    } catch (error) {
        helpers.error.logger(error);
        throw error;
    }
};
