const { check,validationResult } = require('express-validator/check');
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

const authContoller = require('../controllers/AuthenticationController');

router.route('/login').post([
    check('username').exists().withMessage('username is required'),
    check('password').exists().withMessage('password is required'),
],(req,res,next)=>{
    try {
        validationResult(req).throw();

        authContoller.login(req.body.username,req.body.password,(err,result)=>{
            if(err){
                next(err);
            }else{
                res.json(result);
            }
        });
        
    } catch (err) {
        err.status =422;
        next(err);
    }
});

module.exports = router;