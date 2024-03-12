const express = require('express');
const router = express.Router();
const account = require('../Models/account')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const result = await account.create({
            name: req.body.name,
            emailid: req.body.email,
            phonenumber: req.body.phonenumber,
            password: hash,
        })
        res.status(200).json({ status: true, data: 'User Register Successfully' })
    } catch (e) {
        console.log('error', e)
        if (e.fields.phonenumber) {
            res.status(500).json({ status: false, data: 'Phone Number Already Exist' })
        }
        else if (e.fields.emailid)
            res.status(500).json({ status: false, data: 'Emailid Already Exist' })
        else
            res.status(500).json({ status: false, data: 'Server Error' })
    }
})

module.exports = router;