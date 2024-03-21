const Group = require('../Models/group');

exports.createGroup = async (req, res) => {
    try {
        await Group.create({
            groupname: req.body.groupName,
            accountId: req.user.id
        })

        res.status(200).json({ status: true, data: 'Group Created Successfully' })
    } catch (error) {
        console.log('Error', error)
        res.status(200).json({ status: true, data: 'Something Went Wrong' })
    }
}

exports.getGroup = async (req, res) => {
    try {
        const result = await Group.findAll({
            where:{
                accountId: req.user.id
            },
            raw:true
        })
        res.status(200).json({ status:true, data: result})
    } catch (error) {
        console.log('Error', error)
        res.status(200).json({ status: true, data: 'Something Went Wrong' })
    }
}