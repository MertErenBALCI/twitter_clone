const constants = require('../../constants');

class Forbidden extends Error {
    constructor(errorId = -403){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: 'ErrorCode bulunamadı',
                errorCode: null,
                httpStatus: 403,
                result: {}
            };
        }

        super(error.desc);
        
        this.status = false;
        // this.name = 'Forbidden';
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 403;
        this.result = {};
        
    }
}


module.exports = Forbidden;
