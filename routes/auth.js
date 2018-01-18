const { check,validationResult } = require('express-validator/check');
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

router.route('/login').post([
    check('username').exists().withMessage('username is required'),
    check('password').exists().withMessage('password is required'),
],(req,res,next)=>{
    try {
        validationResult(req).throw();

        User.findOne({username:req.body.username},(err,doc)=>{
            if(err){
                res.json(err);
                return;
            }
            if(!doc || !bcrypt.compareSync(req.body.password,doc.password)){
                var err = new Error('User or password invalid');
                err.status = 404;
                next(err);
                return;
            }else{
                doc.set('password', undefined);
                res.json({success:true,data:doc});
            }           
                
        });
        
    } catch (err) {
        err.status =422;
        next(err);
    }
});

module.exports = router;