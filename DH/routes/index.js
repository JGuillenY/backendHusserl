var express = require('express');
var router = express.Router();

//var session = require('express-session');
//var MemoryStore = require('connect').session.MemoryStore

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
