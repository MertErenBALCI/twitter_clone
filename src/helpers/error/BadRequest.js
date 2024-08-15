const constants = require('../../constants');

class BadRequest extends Error {
    constructor(errorId = -400, data = null){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: data ? `ErrorCode bulunamadı ${data}` :'ErrorCode bulunamadı',
                errorCode: null,
                httpStatus: 400,
                result: {}
            };
        }

        super(error.desc);

        this.status = false;
        this.desc = data ? error.desc + ' ' + data : error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 400;
        this.result = {};
        // this.name = 'BadRequest';
    }
}


module.exports = BadRequest;
