const Message = require('../Models/message')
const { Op } = require('sequelize')

exports.saveMessage = async (req, res) => {
    try {
        await Message.create({
            message: req.body.message,
            accountId: req.user.id,
            groupId: req.body.groupId,
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
        res.status(200).json({ status: true, data: result })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}

exports.getGroupMessage = async (req, res) => {
    try {
        const messageLength = await Message.count({
            where: {
                groupId: req.query.groupId,
            }
        })

        const result = await Message.findAll({
            where: {
                groupId: req.query.groupId
            },
            limit: 10,
            offset: messageLength > 10 ? messageLength - 10 : 0,
            raw: true
        })
        res.status(200).json({ status: true, data: result })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}