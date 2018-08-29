var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var name = req.query.name;
    var idcard = req.query.idcard;
    res.render('ownerrent', {name: name,idcard:idcard});
});

module.exports = router;
