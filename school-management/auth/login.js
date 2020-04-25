const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
//importing a module
const courseModel = require('../course/courseModel')
const model = require('../person/model');
  
 module.exports = {
    loginUser: async function (req, res) {

        var numericExpression = /^[0-9]{10}$/;
        var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/igm;
      
        let { email, password, phoneNumber } = req.body;
        var error = [];
        if (!email && !phoneNumber) {
            error.push({ code: 500, message: "Email or Phone is required!" });
        }
    
        if (email && !emailExp.test(email)) {
            error.push({ code: 500, message: "Email is not valid!" });
        }
    
        if (phoneNumber && !numericExpression.test(phoneNumber)) {
            error.push({ code: 500, message: "Phone number is not valid" });
        }
    
        if (!password) {
            error.push({ code: 500, message: "password is required!" });
        }
        else if (password.length < 6) {
            error.push({ code: 500, message: "Password must be six characters or greater" });
        }
    
        if (error.length > 0) {
            res.json({ code: 400, message: 'Validation Errors', data: error });
        }
        // jwt.sign(data, secret, [options, callback])
        model.findOne({ email: req.body.email }, (err, data) => {
           
            if (err) {
                return res.json({
                    code: 400,
                    message: "error in fetching data"
                })
            } else {
                if (data == null) {
                    return res.json({
                        code: 404,
                        data,
                        message: "data not found"
                    })
                } else {
                  
                    if (bcrypt.compareSync(req.body.password, data.password)) {
                        // token is generated
                        jwt.sign({ data: data.email }, 'courses', (err, token) => {
                            //it will save token in database
                            data.token = token;
                            data.save();
                            res.json({ code: 200, message: 'Login successfully', data: data, token });
                        });
    
                    } else {
                        return res.json({
                            code: 400,
                            message: "Password does not matched"
    
                        })
                    }
                }
    
            }
        })
    
    }
 }
