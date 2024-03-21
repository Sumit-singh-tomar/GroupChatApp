const express = require('express')
const router = express.Router()
const groupController = require('../Controller/group')
const authentication = require('../middleware/auth')

router.post('/createGroup', authentication, groupController.createGroup)

router.get('/getGroup', authentication, groupController.getGroup)

module.exports = router;