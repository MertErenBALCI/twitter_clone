const constants = require('../../constants');

class Conflict extends Error {
    constructor(errorId = -409){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: 'Error Code bulunamadı',
                errorCode: null,
                httpStatus: 409,
                result: {}
            };
        }

        super(error.desc);
        
        this.status = false;
        // this.name = 'Conflict';
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 409;
        this.result = {};
       
    }
}


module.exports = Conflict;
