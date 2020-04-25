

// Load user routes
const usrRouter = require('../user/userRoute');
const courseRouter  = require('../course/courseRoute');




module.exports = function (app) {
    // SchoolManagementSystem
    // // Attach User Routes
    app.use('/SchoolManagementSystem/api/v1/user', usrRouter);
    app.use('/SchoolManagementSystem/api/v1/user', courseRouter)
    // app.use('/pluto/api/v1/user', usrRouter);


    // Attach ErrorHandler to Handle All Errors
    // app.use(responseHandler.hndlError);
};
