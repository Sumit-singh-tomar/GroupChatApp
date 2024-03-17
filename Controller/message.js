const Message = require('../Models/message')
const { Op } = require('sequelize')

exports.saveMessage = async (req, res) => {
    try {
        console.log(req.user);
        await Message.create({
            message: req.body.message,
            accountId: req.user.id,
        })
        res.status(200).json({ status: true, data: 'Message Saved Succesfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}


exports.getMessage = async (req, res) => {
    try {
        const result = await Message.findAll({
            where: {
                id: {
                    [Op.gt]: req.params.lastMsgid
                }
            },
            raw: true
        })
        console.log(result)
        res.status(200).json({ status: true, data: result })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}

exports.getNewMessage = async (req, res) => {
    try {
        const result = await Message.findAll({
            raw: true
        })
        console.log(result)
        res.status(200).json({ status: true, data: result })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}