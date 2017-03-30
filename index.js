var express = require('express');
var router = express.Router();

var db = require('./queries');

router.get('/api/susi', db.getAllSusi);
router.get('/api/susi/id', db.getSingleSusi);


module.exports = router;


module.exports = {
    getAllSusi: getAllSusi,
    getSingleSusi: getSingleSusi
};


function getAllSusi(req, res, next) {};
function getSingleSusi(req, res, next) {};