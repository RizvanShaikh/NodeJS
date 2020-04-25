
console.log("");
console.log("//************* School Manangement System *************//");
console.log("");

//importing a module file
const config = require('./lib/config');

//to import .env file
config.dbConfig(config.cfg, (err) => {
    if (err) {
        console.error(err, 'existing the app.');
        return;
    }
    const express = require('express');

    // init express app
    const app = express();

    // set server home directory
    app.locals.rootDir = __dirname;

    console.log(app.locals.rootDir, "directory")

    // config express
    config.expressConfig(app, config.cfg);
    if (err) return res.json(err)

    // attach the routes to the app
    require("./lib/route")(app)

    // start server
    app.listen(config.cfg.port, () => {
        console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
    });

});

