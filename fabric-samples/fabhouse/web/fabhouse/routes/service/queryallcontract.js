var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.render('allcontract', {title: 'fabhouse'});
});

module.exports = router;
