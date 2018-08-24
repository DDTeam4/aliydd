var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.query.value);
  res.render('customer', {title: 'customer'});
});

module.exports = router;
