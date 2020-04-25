'use strict';

//========================== Load internal modules ====================
//person schema
const courseModel = require('./courseModel');
const model = require('../user/model');// person schema 
const courseConstant = require('./courseConstants');
const cousrseMapper = require('./courseMapper');
// const = require('./courseConstants');
// init user dao
let BaseDao = new require('../dao/baseDao');
const courseDao = new BaseDao(courseModel);

//========================== Load Modules End ==============================================

//========================== Export Module Start ==============================
module.exports = {

};
//========================== Export Module End ===============================
