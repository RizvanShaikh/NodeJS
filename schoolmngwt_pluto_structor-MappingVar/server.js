
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

//     var whitelist = ['http://localhost:4200', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
    // app.options('*', cors(corsOptions)) // include before other routesss
    // app.use(cors());
    // attach the routes to the app

    //CORS Middleware
    // app.use(function (req, res, next) {
    //     //Enabling CORS
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    //     next();
    // });

    require("./lib/route")(app)

    // start server
    app.listen(config.cfg.port, () => {
        console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
    });

});

