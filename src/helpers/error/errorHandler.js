// const constants = require('../../constants');
const helpers = require('../../helpers');
const errorHandler = (err) => {
    let errorObj = {};
    if(
        err instanceof helpers.error.MissingField ||
        err instanceof helpers.error.NotFound ||
        err instanceof helpers.error.ServerError ||
        err instanceof helpers.error.BadRequest ||
        err instanceof helpers.error.Forbidden ||
        err instanceof helpers.error.WrongParam ||
        err instanceof helpers.error.Conflict ||
        err instanceof helpers.error.UnAuth ||
        err instanceof helpers.error.AccessDenied
    ) {
        errorObj = {
            status: err.status,
            // name: err.name,
            desc: err.desc,
            errorCode: err.errorCode,
            httpStatus: err.httpStatus,
            result: {}
        };
    } else if(err.name === 'BSONTypeError') {
        errorObj = {
            status: false,
            // name: err.name,
            desc: 'OBJECT ID formatı yanlış. Lütfen object id yi object id formatında giriniz',
            errorCode: 1453,
            httpStatus: 422,
            result: {}
        };
    } else if(err.name === 'AxiosError') {
        errorObj = {
            status: false,
            desc: err.response?.data?.message || err.message,
            errorCode: 1454,
            httpStatus: err.response?.status || 417,
            result: {}
        };
    } else {
        errorObj = {
            status: false,
            // name: err.name,
            desc: err.message,
            errorCode: -9999,
            httpStatus: 500,
            result: {}
        };
    }

    return errorObj;
    

    // if (err.name === 'SyntaxError') {
    //     errorObj.desc = 'unexpected syntax';
    //     errorObj.httpStatus = 400;
    // }
    // if (err.name === 'ValidationError') {
    //     errorObj.desc = 'unexpected ValidationError';
    //     errorObj.httpStatus = 400;
    // }
    // if (err.name === 'CastError') {
    //     errorObj.desc = 'palease rovide a valid id';
    //     errorObj.httpStatus = 400;
    // }
    // if (err.name === 'ReferenceError') {
    //     errorObj.desc = 'ReferenceError hatası aga';
    //     errorObj.httpStatus = 500;
    // }
    // if (err.name === 'NotFound') {
    //     errorObj.desc = 'NotFound hatası aga';
    //     errorObj.httpStatus = 404;
    // }
    // if (err.name === 'BSONTypeError') {
    //     errorObj.desc = 'BSONTypeError hatası aga';
    //     errorObj.httpStatus = 500;
    // }


    //console.log(errorObj);
  

};

module.exports = errorHandler;