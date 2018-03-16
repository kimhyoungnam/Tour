var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var enroll = require('./login/enroll');
var login  = require('./login/login');

router.use('/login',login);
router.use('/enroll',enroll);

module.exports = router;