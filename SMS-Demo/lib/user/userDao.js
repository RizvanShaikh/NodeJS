'use strict';
//========================== Load internal modules ====================
//person schema
const User = require('./model');
const model = require('../user/model');
const nodemailer = require('nodemailer');
//importing a module
const courseModel = require('../course/courseModel');
const userMapper = require('./userMapper');
const courseConstants = require('../course/courseConstants')
const userConstants = require('./userConstants');
// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);
//========================== Load Modules End ==============================================

//========================== Export Module Start ==============================
module.exports = {

};
//========================== Export Module End ===============================
