const constants = require('../../constants');

class NotFound extends Error {
    constructor(errorId = -404){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);

        if(!error) {
            error = {
                status: false,
                desc: 'Error code bulunamadı !!!',
                errorCode: null,
                httpStatus: 404,
                result: {}
            };
        }

        super(error.desc);

        this.status = false;
        // this.name = 'NotFound';
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 404;
        this.result = {};
       
    }

}


module.exports = NotFound;
