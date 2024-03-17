const express = require('express')
const router = express.Router()
const messageController = require('../Controller/message')
const authentication = require('../middleware/auth')

router.post('/saveMessage', authentication, messageController.message)

router.get('/getMessage',authentication,messageController.getMessage)

module.exports = router;