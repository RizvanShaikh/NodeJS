//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("./model/Exception");
var constants = require('./constants');
//========================== Load Modules End =============================

//========================== Export Module Start ===========================
module.exports = {

    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.intrnlSrvrErr, err);
    },

    getCustomErrorException: function (errMsg, error) {
        return new Exception(5, errMsg, error);
    },

    tokenGenException: function (err) {
        return new Exception(3, constants.MESSAGES.tokenGenError, err);
    },

};

//========================== Export Module End ===========================