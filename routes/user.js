var express = require('express');
var pjson = require('../package.json');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

router.route('/')
    .put(function(req, res, next) {
        let user =  new User(req.body);

        user.save((err)=>{
            if(err) {
                next(err);
                return;
            }
            user.set('password', undefined);
            res.json({success:true,data:user});
        });
    })

    .get((req,res,next)=>{
        res.send('not implementation');
    })


module.exports = router;
