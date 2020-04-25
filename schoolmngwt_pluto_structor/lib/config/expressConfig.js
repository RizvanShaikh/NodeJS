'use strict'

//===============================Load Modules Start========================

const express = require('express');
const bodyParser = require('body-parser');

/**
*@socket implementation @returns
* var server = require('http').Server(express());
* var io = require('socket.io')(server);
* require("../socket/socketHandler.js")(io);
*/


module.exports = function (app, env) {
    // parses application/json bodies
    app.use(bodyParser.json());
    // parses application/x-www-form-urlencoded bodies
    // use queryString lib to parse urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: false }));

    // for the images
    app.use('./lib/uploads/', express.static('uploads'));

    // process.on('unhandledRejection', function (err) {
    //     console.log(err);
    // });
};


/*
 *
 * all middlware are here
 */