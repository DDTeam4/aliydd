var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("in queryhouse()...");
  res.render('houselist', {title: 'fabhouse'});
});

module.exports = router;
