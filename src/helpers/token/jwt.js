const jwt = require('jsonwebtoken');
require('dotenv').config();
const helpers = require('../../helpers');

/**
 * jwt token create with options
 * 
 * @param {Object} data 
 * @param {Object} options 
 * @returns 
 */
module.exports.create = (data, options, access = true) => {
    try {
        if (access) {
            let token = jwt.sign(data, process.env.JWT_SECRET_KEY_USER, options);
            return token;
        }
        let token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, options);
        return token;
    } catch (error) {
        helpers.error.logger(error);
    }
    return false;
};

/**
 * jwt token verify and decode
 * 
 * @param {String} token 
 * @returns 
 */
module.exports.verify = (token, access = true) => {
    try {
        if (access) {
            return jwt.verify(token, process.env.JWT_SECRET_KEY_USER);
        }

        return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
    } catch (error) {
        helpers.error.logger(error);
    }
    return false;
};