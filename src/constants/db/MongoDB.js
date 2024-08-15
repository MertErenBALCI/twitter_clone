module.exports.connection = {
    minPoolSize: 5,
    maxPoolSize: 20,
    retry: 3,
    maxRetry: 10,
    connectTimeoutMS: 30 * 1000,
    keepAlive: true
};

module.exports.objectIds = [
    '_id'
];

module.exports.generalDbs = [
];

module.exports.withSystemidCollection = [
];

module.exports.idAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';