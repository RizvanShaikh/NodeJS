const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const multer = require('multer');
// for upload an image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, + new Date() + file.originalname); 

    }
});
const fileFilter = (req, file, cb) => {
 // reject file
     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);  
      } else {
          cb(null, false);
        }
 };
const upload =  multer({
    storage: storage, 
    limits: {
    fileSize: 500 * 500 * 5
 },
 fileFilter: fileFilter
});
//importing a module file
const config = require('./config');
const personAction = require('./person/person_actions');
const CoursesAction = require('./course/courses_actions');
const authLogin =  require('./auth/login');

require('dotenv').config();

app.set('port', process.env.PORT || 8090);
// connecting the db
mongoose.connect(process.env.dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// for the image
app.use('/uploads', express.static('uploads'));
// API Routes
// upload.single('userImage'),
app.post('/createUser',[upload.single('userImage'),(req, res) => personAction.createUser(req, res)]);
// User info
app.get('/userInfo', (req, res) => personAction.userInfo(req, res));
// Create course
app.post('/createCourses', (req, res) => CoursesAction.createCourses(req, res));
// list the cousres
app.get('/listCourses', (req, res) => CoursesAction.listCourses(req, res));
// student buy courses
app.post('/buyCourses', (req, res) => CoursesAction.buyCourses(req, res));
// login
app.post('/login', (req, res) => authLogin.loginUser(req, res));
// techer can delete only his courses
app.post('/deleteCours', (req, res) => CoursesAction.deleteCourse(req, res));
app.post('/makeFavCourses', (req, res) => CoursesAction.makeFavCourses(req, res));
app.post('/makUnFavCourses', (req, res) => CoursesAction.makUnFavCourses(req, res));

process.on('unhandledRejection', function(err) {
    console.log(err);
});
// return exception on  invalid route pass
app.all('*', (req, res) => {
    return res.json({
        code: 404,
        message: "Invalid route."
    })
});
// listening port on port 3000
app.listen(app.get('port'), function () {
    console.log(`listening...${app.get('port')}`);
});
