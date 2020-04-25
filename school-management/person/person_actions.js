const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
//importing a module
const model = require('./model');

module.exports = {
    createUser: async function (req, res) {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.userImage = req.file.path;
        
        var bonusStudent = 25;
        var Model = new model(req.body);

        Model.save(async (err, newUser) => {
            if (err) {
                return res.json({
                    code: 404,
                    message: err.message
                })
            } else {
                newUser.referralCode = await generateReferralCode();
                if (req.body.referralCode != null) {
                    model.findOne({ referralCode: req.body.referralCode }, (err, reffry) => {
                        if (err) {
                            return res.json({
                                code: 400,
                                message: "error in fetching data"
                            })
                        }
                        else {
                            if (reffry) {
                                // if student reffered by teacher        
                                if (reffry.userType == 'teacher' && newUser.userType == 'student') {
                                  
                                    reffry.bonus += 50; // 50 + 50
                                    newUser.bonus = bonusStudent + 25; //25
                                    
                                }
                                // if teacher reffered by teacher   
                                else if (reffry.userType == 'student' && newUser.userType == 'teacher') {
                                  
                                    reffry.bonus += 25;
                                    newUser.bonus = bonusStudent + 25; //25
                                  
                                  } else if (reffry.userType == 'teacher' && newUser.userType == 'teacher') {
                                    
                                    reffry.bonus += 50;
                                    newUser.bonus = bonusStudent + 50;
                                  
                                } else if (reffry.userType == 'student' && newUser.userType == 'student') {
                                   
                                    reffry.bonus += 25;
                                    newUser.bonus = bonusTeacher + 25;
                                   
                                }
                                /********* mail ********/
                                function eMail(newUser, reffry) {
                                    var mailResult = "Hi!" + `${reffry.firstName}` + "your referral code is used by" + `${newUser.firstName}` + `${newUser.lastName}.`
                                    return mailResult
                                }
                                var eMailResult = eMail(newUser, reffry)
                                console.log(eMailResult, "71");
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'rizwan@webcluesinfotech.com',
                                        pass: 'rizwan1994'
                                    }
                                });

                                var mailOptions = {
                                    from: 'rizwan@webcluesinfotech.com',
                                    to: 'faizanqureshi0@gmail.com',

                                    subject: 'Sending Email using Node.js',
                                    text: "Congratulations!" + eMailResult + `Your current balance point is ${reffry.bonus}. Thank You!`
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error, "83");
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                /********************/   
                                reffry.save();
                                newUser.save().then(() => {
                                    
                                    res.status(200);
                                    newUser.refferncedBy = reffry._id;
                                    model.update(
                                        { _id: reffry._id },
                                        { $addToSet: { referralCodeUsedBy: newUser._id } }
                                    ).then(docs => {
                                        result.status = "201";
                                        result.message = `Your referral code is used by! ${newUser._id} `;
                                        res.status(201).send(result);
                                    })
                                        .catch(e => {
                                            result.status = 400;
                                            result.message = e;
                                            result.data = {};
                                            return res.json(result);
                                        })
                                    newUser.welcome = `Welcome ${newUser.firstName} to School Management System!`
                                    return res.send(newUser);
                                });
                            }
                        }
                    })
                } else {
                    // if referral code is doesn't apply
                    newUser.bonus += 25;
                    console.log(newUser, "148")
                    newUser.welcome = `Welcome ${newUser.firstName} to School Management System!`
                    newUser.save().then(() => {
                        res.status(200);
                        return res.send(newUser);
                    })
                }
            }
        })
    },
    //list of favourite courses of user and also created courses
    userInfo: async function (req, res) {
        if (req.headers.authorization == null) {
            return res.json({
                code: 404,
                message: "Please apply the token!"
            })
        } else {
            model.findOne({ token: req.headers.authorization }, (err, userData) => {
               
                return res.json({
                    code: 200,
                    userData
                })
            })
         }
     },
}
async function generateReferralCode(length = 10) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
