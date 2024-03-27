const { Op } = require('sequelize');
const Account = require('../Models/account');
const Group = require('../Models/group');
const UserGroup = require('../Models/usergroup');

exports.createGroup = async (req, res) => {
    try {
        const result = await Group.create({
            groupname: req.body.groupName,
        })
        
        req.body.addFriends.push(req.user.id)
        req.body.addFriends.map(async (item) => {
            console.log('item',item);
            await UserGroup.create({
                accountId: item,
                groupId: result.id,
            })
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
            include: [{
                model: UserGroup,
                where: { accountId: req.user.id },
            }],
            raw: true
        });
        res.status(200).json({ status:true, data: result})
    } catch (error) {
        console.log('Error', error)
        res.status(200).json({ status: false, data: 'Something Went Wrong' })
    }
}