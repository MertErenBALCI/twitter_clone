const constants = require('../../constants');

class WrongParam extends Error {
    constructor(errorId = -422){
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
        // this.name = 'WrongParam';
        this.status = false;
        this.desc = error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 422;
        this.result = {};
       
    }
}


module.exports = WrongParam;
