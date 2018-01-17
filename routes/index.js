var express = require('express');
var pjson = require('../package.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Status System',status:{
    version:pjson.version
  } });
});

module.exports = router;
