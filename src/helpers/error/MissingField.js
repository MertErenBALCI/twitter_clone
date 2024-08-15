const constants = require('../../constants');

class MissingField extends Error {
    constructor(errorId = -406, datas = []){
        let error = constants.error.error_tr.find(e => e.errorCode === errorId);
        
        if(!error) {
            error = {
                status: false,
                desc: 'ErrorCode bulunamadı',
                errorCode: null,
                httpStatus: 406,
                result: {}
            };
        }

        super(error.desc);
        
        this.status = false;
        // this.name = 'MissingField';
        this.desc = datas.length > 0 ? datas + ' ' + error.desc : error.desc;
        this.errorCode = error.errorCode;
        this.httpStatus = 406;
        this.result = {};
       
    }
}


module.exports = MissingField;
