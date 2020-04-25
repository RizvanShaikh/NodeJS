'use strict';

//========================== Class Definitions Start =====================
// Exception(1, constants.MESSAGES.intrnlSrvrErr, err);
class Exceptions {
    constructor(errorCode, msg, errStackTrace) {
        this.errorCode = errorCode;
        this.message = msg;
        if (errStackTrace) {
            this.errors = errStackTrace;
        }
    }
}

//========================== Class Definitions End =======================

//========================== Export module start ==================================

module.exports = Exceptions;

//========================== Export module end ==================================
