const constants = require('../../constants');
const helpers = require('../../helpers');
const db = require('../../db');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    responseBody.result = {
        api: false,
        mongo: false,
    };

    try {
        responseBody.timestamp = helpers.date.moment.timestamp();

        let mongoTest = await new db.mongodb.CRUD('vehicle_wash', 'do_not_delete').find({}, [0, 1]);
     
    
        if(mongoTest && mongoTest.length > 0) {
            responseBody.result.mongo = true;
        } else {
            responseBody.httpStatus = 500;
            responseBody.status = false;
        }

        responseBody.result.api = true;
        responseBody.status = true;
    } catch (error) {
        helpers.error.logger(error);
        responseBody.desc = error.name + ' ' + error.message;
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};