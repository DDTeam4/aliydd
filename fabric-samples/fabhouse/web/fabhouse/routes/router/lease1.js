var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    var name = req.query.name;
    var idcard = req.query.idcard;
    res.render('lease1', {name: name,idcard:idcard});
});

module.exports = router;
