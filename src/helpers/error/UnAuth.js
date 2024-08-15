const constants = require('../../constants');

class UnAuth extends Error {
    constructor(errorId = -401){
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
        this.httpStatus = 401;
        this.result = {};
       
    }
}


module.exports = UnAuth;
