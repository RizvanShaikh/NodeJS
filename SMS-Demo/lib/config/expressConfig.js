'use strict'

//===============================Load Modules Start========================

const express = require('express');
const bodyParser = require('body-parser');
const cors   = require('cors');

/**
*@socket implementation @returns
* var server = require('http').Server(express());
* var io = require('socket.io')(server);
* require("../socket/socketHandler.js")(io);
*/

module.exports = function (app, env) {
        //Enable cors
     app.use(cors());
    // parses application/json bodies
    app.use(bodyParser.json());
    // use queryString lib to parse urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: false }));
    // for the images
    app.use('./lib/uploads/', express.static('uploads'));
};
/*
 *
 * all middlware are here
 */