
//========================== Load Modules Start ==========================

//========================== Load External Modules ==========================

//========================== Load Internal Modules ==========================

 var constants = require('../constants');


//========================== Load Modules End ==========================

//========================== Class Definitions Start =====================
// var result = new APIResponse(constants.STATUS_CODE.ERROR, err);
class APIResponse {
    constructor(sc, result) {
        this.status = sc;
        if (sc == constants.STATUS_CODE.SUCCESS) {
            result ? this.response = result : constants.EMPTY;
        } else {
            result ? this.error = result : constants.EMPTY;
        }
        this.time = new Date().getTime();
    }
}

//========================== Class Definitions End =======================

//========================== Export module start ==================================

module.exports = APIResponse;

//========================== Export module end ==================================
