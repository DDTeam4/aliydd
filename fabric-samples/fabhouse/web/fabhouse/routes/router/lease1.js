var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
   
    var idcard = req.query.idcard;
    var status = req.query.status;
    res.render('lease1', {idcard:idcard,status:status});
});

module.exports = router;
