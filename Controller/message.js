const Message = require('../Models/message')

exports.message = async (req, res) => {
    try {
        console.log(req.user);
        const result = await Message.create({
            message: req.body.message,
            accountId : req.user.id,
        })
        res.status(200).json({status:true, data:'Message Sent Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, data: 'Server Error'})
    }
}