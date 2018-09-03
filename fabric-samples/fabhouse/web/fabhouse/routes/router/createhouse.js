var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('ownerInfo', {title: 'fabhouse'});
});

module.exports = router;
