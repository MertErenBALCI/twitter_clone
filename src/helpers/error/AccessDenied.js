const constants = require('../../constants');

class AccessDenied extends Error {
    constructor(errorId = -603){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: 'ErrorCode bulunamadı',
                errorCode: null,
                httpStatus: 500,
                result: {}
            };
        }

        super(error.desc);

        this.status = false;
        // this.name = 'UnAuth';
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 603;
        this.result = {};
       
    }
}


module.exports = AccessDenied;
