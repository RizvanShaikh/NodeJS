const _ = require('lodash');
const path = require('path');

const dbConfig = require('./dbConfig');
const expressConfig = require('./expressConfig')

var envConfig = {};
var cfg = {};

var environment = process.env.NODE_ENV || 'dev';
// console.log(environment, "11 environment");

//ENV Config
switch (environment) {
    case 'dev':
    case 'development':
        envConfig = require('./env/development');
        break;
    case 'prod':
    case 'production':
        envConfig = require('./env/production');
        break;
    case 'stag':
    case 'staging':
        envConfig = require('./env/staging');
        break;

}

var defaultConfig = {
    environment: "development",
    ip: 'localhost',
    port: 4009,
    protocol: 'http',
    TAG: "development",
    uploadDir: path.resolve("./uploads"),
    mongo: {
        dbName: 'SchoolManagementSystem',
        dbUrl: "mongodb://localhost:27017/"
    },

};
//Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);


module.exports = {
    cfg,
    dbConfig,
    expressConfig
};