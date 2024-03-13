const express = require('express');
const router = express.Router();
const accountController = require('../Controller/account')

router.post('/register', accountController.account)

router.post('/login', accountController.login)

module.exports = router;