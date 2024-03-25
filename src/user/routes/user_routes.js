const express = require('express');

const new_user = require('./new_user');
const get_user = require('./get_user');
const update_user = require('./update_user');
const verify_user = require('./verify_user');

const validate_method = require('../middlewares/validate_request');
const invalid_method = require('../utils/invalid_method');
const validate_body = require('../middlewares/validate_body');
const verifyUser = require('../middlewares/verify_user');

const router = express.Router()

router.use(validate_body);
router.use(new_user);
router.use(get_user);
router.use(update_user);
router.use(verify_user);
router.all('/', validate_method, invalid_method);
router.all('/self', validate_method, invalid_method, verifyUser);

module.exports = router;