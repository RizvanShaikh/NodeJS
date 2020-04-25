'use strict';

//=================================== Load Modules start ===================================

//=================================== Load external modules=================================
const mongoose = require('mongoose');

//=================================== Load Modules end =====================================


function connectDb(env, callback) {
    // console.log(env, '12')

    let dbName = env.mongo.dbName;
    let dbUrl = env.mongo.dbUrl;
    let dbOptions = env.mongo.options;

    if (env.isProd) {
        console.info("configuring db in " + env.TAG + " mode");
        dbUrl = dbUrl + dbName;
    } else {
        console.info("configuring db in " + env.TAG + " mode");
        dbUrl = dbUrl + dbName;
        mongoose.set('debug', true);
    }


    console.info("connecting to -> " + dbUrl);
    // connecting the db
    mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    // mongoose.connect(dbUrl,dbOptions);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.info('connected to DB', dbName, 'at', dbUrl);
        callback();
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.info('DB connection error: ' + err);
        callback(err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.info('DB connection disconnected');
        callback("DB connection disconnected");
    });


}


module.exports = connectDb;



/**
 * dbConfig to connect the data base
 *
 */