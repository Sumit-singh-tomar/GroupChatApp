const express = require('express');
const router = express.Router();
const accountController = require('../Controller/account')
const authentication = require('../middleware/auth')

router.post('/register', accountController.account)

router.post('/login', accountController.login)

router.get('/getAllUser',authentication, accountController.getAllUser)

module.exports = router;