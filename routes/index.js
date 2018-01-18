var express = require('express');
var pjson = require('../package.json');
var router = express.Router();
var Error = require('../models/Error');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Status System',status:{
    version:pjson.version
  } });
});

router.get('/errs',(req,res,next)=>{
  Error.find({},(err,errs)=>{
    res.render('error',{errs:errs});
  });
});

module.exports = router;
