//   const jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var exceptions = require('./customExceptions');

var JWT_SECRET_KEY = "login_secret_key_to_save_data";

var genUsrToken = function (user) {
    var options = {};
    return jwt.signAsync(user, JWT_SECRET_KEY, options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

module.exports = {
    genUsrToken: genUsrToken,
};
