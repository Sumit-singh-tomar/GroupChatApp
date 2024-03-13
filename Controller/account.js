const account = require('../Models/account')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

exports.account = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        await account.create({
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
}

function generateToken(id,name, email, phonenumber) {
    return jwt.sign({id, name, email, phonenumber},process.env.JWT_SECRET_KEY)
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await account.findOne({
            where: {
                [Op.or]: [
                    { emailid: email },
                    { phonenumber: email },
                ],
            },
            raw: true,
        })

        if (result === null) {
            res.status(404).json({ status: false, data: 'Account Not Exist' })
        }
        else {
            const match = await bcrypt.compare(password, result.password)
            if (match) {
                res.status(200).json({ status: true, token: generateToken(result.id, result.name, result.emailid, result.phonenumber) })
            }
            else {
                res.status(401).json({ status: false, data: 'Password Incorrect' })
            }
        }
    } catch (e) {
        console.log('error',e);
        res.status(500).json({ status: false, data: 'Something Went Wrong' })
    }
}