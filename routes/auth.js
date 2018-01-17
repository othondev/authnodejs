const { check,validationResult } = require('express-validator/check');
var express = require('express');
var router = express.Router();

router.route('/login').post([
    check('username').exists().withMessage('username is required'),
    check('password').exists().withMessage('password is required'),
],(req,res,next)=>{
    try {
        validationResult(req).throw();
        res.json({success:true,data:req.body});
    } catch (err) {
        res.json(err.mapped()).status(422);
    }
});

module.exports = router;