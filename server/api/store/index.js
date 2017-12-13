'use strict';

var express = require('express');
var controller = require('./store.controller');

var router = express.Router();

router.get('/:key', controller.show);
router.post('/', controller.create);

module.exports = router;
