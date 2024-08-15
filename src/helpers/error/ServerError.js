const constants = require('../../constants');

class ServerError extends Error {
    constructor(errorId = -500){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: 'Server Error !!!',
                errorCode: -500,
                httpStatus: 500,
                result: {}
            };
        }

        super(error.desc);

        this.status = false;
        // this.name = 'ServerError';
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 500;
        this.result = {};
       
    }
}


module.exports = ServerError;
