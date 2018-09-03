var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var idcard = req.body.idcard;
    res.render('myrent', {name: name,idcard:idcard});
});

module.exports = router;
