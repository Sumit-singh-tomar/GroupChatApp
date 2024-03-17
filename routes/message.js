const express = require('express')
const router = express.Router()
const messageController = require('../Controller/message')
const authentication = require('../middleware/auth')

router.post('/saveMessage', authentication, messageController.saveMessage)

router.get('/getMessage/:lastMsgid',authentication,messageController.getMessage)

router.get('/getNewMessage',authentication,messageController.getNewMessage)

module.exports = router;