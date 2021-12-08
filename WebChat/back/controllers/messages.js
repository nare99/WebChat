const Users = require('../models/Users');
const Messages = require('../models/Messages');
const { Op } = require("sequelize");
const { Sequelize } = require('sequelize');



const addMessage = async (req,res) => {
    const message = Messages.build({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        message: req.body.message
    })
    try {
        const result = await message.save();
        const mess = await Messages.findOne({ include: [{
            model: Users,
            as: 'sender',
            attributes: ['name', 'surname']
        },
        {
            model: Users,
            as: 'receiver',
            attributes: ['name', 'surname']
        }],
        attributes: { exclude: ['createdAt','updatedAt'] },
        where: { id: result.id }});
        res.send(mess);
    } catch(e) {
        res.status(500).send(e)
    }
}

const deleteMessage = async (req,res) => {
    try {
        const result = await Messages.destroy({
            where: {
                id: req.params.id
            }
        })
        if(result) {
            res.status(200).send(`Successful deletion`);
        } else {
            res.status(404).send('There are no such a Message');
        }
    } catch(e) {
        res.status(500).send()
    }

}

const editMessage = async (req,res) => {
    try {
        const [ _, [updatedMessage ] ] = await Messages.update(
            req.body,
            { returning: true, where: { id: req.params.id}}
        )
        if(updatedMessage) {
            res.json(updatedMessage);
            return;
        }
        res.status(404).send('Not found');
    }catch(e) {
        res.status(500).send()
    }
}

const getMessage = async (req,res) => {
    try {
        const reqId = req.params.id;
        const Message = await Messages.findAll({
            include: [{
                model: Users,
                as: 'sender',
                attributes: ['name', 'surname']
            },
            {
                model: Users,
                as: 'receiver',
                attributes: ['name', 'surname']
            }],
            attributes: { exclude: ['createdAt','updatedAt'] },
            where: {
                id: reqId
            }
        });
        if(Message.length) {
            res.send(Message);
        } else {
            res.status(404).send('There are no such a Message');
        }
    } catch(e) {
        res.status(500).send();
    }

}

const getMessages = async (req,res) => {
    try {
        const messages = await Messages.findAll({
            include: [{
                model: Users,
                as: 'sender',
                attributes: ['name', 'surname']
            },
            {
                model: Users,
                as: 'receiver',
                attributes: ['name', 'surname']
            }],
            attributes: { exclude: ['createdAt','updatedAt']}
        });
        res.send(messages);
    } catch(e){
        res.status(404).send(`${e}`);
    }
}

const getConversation = async (req,res) => {
    try {
        const messages = await Messages.findAll({
            include: [{
                model: Users,
                as: 'sender',
                attributes: ['name', 'surname']
            },
            {
                model: Users,
                as: 'receiver',
                attributes: ['name', 'surname']
            }],
            attributes: { exclude: ['createdAt','updatedAt']},
            where: Sequelize.or(
                Sequelize.and({sender_id:req.params.id1}, {receiver_id:req.params.id2}),
                Sequelize.and({sender_id:req.params.id2}, {receiver_id:req.params.id1}),
                ),
        })
        res.send(messages);
    } catch(e) {
        res.status(200).send(`${req.params.id1} `);
    }
}

module.exports = {
    getMessage,
    getMessages,
    addMessage,
    editMessage,
    deleteMessage,
    getConversation,
}