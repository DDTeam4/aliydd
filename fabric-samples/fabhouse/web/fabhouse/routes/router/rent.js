var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    name = req.body.name;
    idcard = req.body.idcard;
    res.render('rent', {result:{name:name,idcard:idcard}});
});

module.exports = router;
