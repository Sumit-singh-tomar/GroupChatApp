const jwt = require('jsonwebtoken');
const account = require('../Models/account');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const result = await account.findByPk(user.id, {raw:true})
        req.user = result;
        next()

    } catch (error) {
        res.status(401).json({ status: false, data: 'User Not Authorized' })
    }
}

module.exports = authenticate;