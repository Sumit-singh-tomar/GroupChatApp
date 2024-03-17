const Message = require('../Models/message')

exports.message = async (req, res) => {
    try {
        console.log(req.user);
        await Message.create({
            message: req.body.message,
            accountId: req.user.id,
        })
        res.status(200).json({ status: true, data: 'Message Sent Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}


exports.getMessage = async (req, res) => {
    try {
        console.log(req.user, ',,,,,,,,,,,,,,,,,,,,,,,,,');
        const result = await Message.findAll({ raw: true })
        console.log(result)
        res.status(200).json({ status: true, data:result})
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, data: 'Server Error' })
    }
}