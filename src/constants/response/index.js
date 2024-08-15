module.exports.DEFAULT = () => {
    return {
        status: true,
        errorCode: null,
        httpStatus: 200,
        desc: '',
        result: {}
    };
};

module.exports.NOT_FOUND_LIST = (data) => {
    return {
        status: true,
        errorCode: null,
        httpStatus: 200,
        desc: '',
        result: {
            [data] : []
        }
    };
};

module.exports.NOT_FOUND_GET = (data) => {
    return {
        status: true,
        errorCode: null,
        httpStatus: 200,
        desc: '',
        result: {
            [data] : {}
        }
    };
};

module.exports.MISSING_FIELD = () => {
    return {
        status: false,
        desc: 'Missing Paramter(s)!',
        errorCode: 1,
        httpStatus: 406,
        result: {}
    };
};

module.exports.UNAUTH = () => {
    return {
        status: false,
        desc: 'Unauthenticated Request !',
        errorCode: 2,
        httpStatus: 401,
        result: {}
    };
};

module.exports.SERVER_ERROR = () => {
    return {
        status: false,
        desc: 'Server Error !',
        errorCode: 3,
        httpStatus: 500,
        result: {}
    };
};

module.exports.FORBIDDEN = () => {
    return {
        status: false,
        // name: 'Forbidden',
        desc: 'Forbidden Request !',
        errorCode: 4,
        httpStatus: 403,
        result: {}
    };
};

module.exports.NOT_FOUND = () => {
    return {
        status: false,
        // name: 'Not Found',
        desc: 'Not Found !',
        errorCode: 5,
        httpStatus: 404,
        result: {}
    };
};

module.exports.NOT_FOUND_EP = () => {
    return {
        status: false,
        // name: 'Not Found',
        desc: 'There is no EP !',
        errorCode: 5,
        httpStatus: 404,
        result: {}
    };
};

module.exports.WRONG_PARAM = () => {
    return {
        status: false,
        // name: 'Wrong Parameter',
        desc: 'Wrong Parameter (s)!',
        errorCode: 6,
        httpStatus: 422,
        result: {}
    };
};

module.exports.CONFLICT = () => {
    return {
        status: false,
        // name: 'Duplicate Data',
        desc: 'Duplicate Data !',
        errorCode: 7,
        httpStatus: 409,
        result: {}
    };
};

module.exports.BAD_REQUEST = () => {
    return {
        status: false,
        // name: 'Bad Request',
        desc: 'Bad Request!',
        errorCode: 8,
        httpStatus: 400,
        result: {}
    };
};

module.exports.GTFS_WRONG_PARAM = () => {
    return {
        status: false,
        desc: 'GTFS Wrong Parameter (s)!',
        errorCode: 9,
        httpStatus: 422,
        result: {}
    };
};

module.exports.ERROR_WRAPPER = (err) => {
    if(err.status === 400) {
        return this.BAD_REQUEST();
    } else if(err.statusCode === 401) {
        return this.UNAUTH();
    } else if(err.statusCode === 403) {
        return this.FORBIDDEN();
    } else if(err.status === 404) {
        return this.NOT_FOUND();
    } else if(err.statusCode === 406) {
        return this.MISSING_FIELD();
    } else if(err.statusCode === 409) {
        return this.CONFLICT();
    } else if(err.statusCode === 422) {
        return this.WRONG_PARAM();
    } else if(err.statusCode === 500) {
        return this.SERVER_ERROR();
    } else {
        return this.SERVER_ERROR();
    }
};

module.exports.EXCEPTION = (message, statusCode) => {
    return {
        name: 'ERROR',
        message: message,
        statusCode: statusCode,
    };
   
};

module.exports.CONFIG = {
    maxResultInArray: 60,
};