const express = require('express');
const router = express.Router();
const authContoller = require('../controllers/AuthenticationController');

router.route('/')

.post((req,res,next)=>{
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        let error = new Error('No token provided');
        error.status = 403;
        next(error);
        return;
    }

    authContoller.decode(token,(err,doc)=>{
        if(err){
            let error = new Error('Failed to authenticate token.');
            error.status = 401;
            next(error);
            return;
        }
        res.send({success:true,data:doc});
    });

})

module.exports = router;