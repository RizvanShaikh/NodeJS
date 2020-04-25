'use strict';

var bcrypt = require('bcryptjs');
// random sting generate randon string for forgot password
var randomstring = require('randomstring');
var sha256 = require('sha256');


function generateResetPassordToken() {
    return randomstring.generate();
}
async function convertPass(req, res, next) {
   
    let pass = await bcrypt.hash(req.body.password, 10)
    req.body.password = pass;
   
    next()
}

async function convertPassword(stringNumber) {
    try {
        return bcrypt.hash(stringNumber, bcrypt.genSaltSync(10))
    } catch (error) {
      
        return error
    }
}

function verifyPassword(user, isExist) {
    var password = bcrypt.compare(user.password, isExist.password);
    return password;
}
/**
 * returns if email is valid or not
 * @returns {boolean}
 */
function isValidEmail(email) {
    var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(email);
}
/**
 * returns random number for password
 * it will generate random password
 * @returns {string}
 */
var getRandomPassword = function () {
    var randomPassword = getSHA256(Math.floor((Math.random() * 1000000000000) + 1));
   
    return randomPassword;
};

var getSHA256 = function (val) {
    return sha256(val + "password");
};

//========================== Export Module Start ===========================

module.exports = {
    convertPass,
    isValidEmail,
    verifyPassword,
    getRandomPassword,
    convertPassword,
    generateResetPassordToken
}
//========================== Export Module End===========================