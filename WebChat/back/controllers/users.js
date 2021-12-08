const { generateToken } = require('../services/auth');

const Users = require('../models/Users');
const Messages = require('../models/Messages');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signIn = async (req,res) => {
    try {
        const user = await Users.findOne({ where: { email: req.body.email }});

        if(!user) {
            res.status(404).send('User not found');
        }

        const { password } = req.body;
        bcrypt.compare(password, user.hashedPassword, (err, result) => {
            if(err) {
                res.status(500).send();
                return;
            }
            if(!result) {
                res.status(401).send('Unauthorized');
                return;
            }
            generateToken(req, res);
        })
    } catch(e) {
        res.status(500).send();
    }
}

const signUp = (req,res) => {

    const { password, ...userData } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {

        if(err) {
            res.status(404).send(`Invalid password field ${err}`);
        }

        try {
            const user = Users.build({ ...userData, hashedPassword })
            const result = await user.save();
            generateToken(req, res);
        } catch(e) {
            if(e.name === 'SequelizeUniqueConstraintError') {
                res.status(401).send('Email address already exists.');
                return;
            }
            res.status(500).send(e);
        }
    })
}

const editUser = async (req,res) => {
        const { password, ...userData } = req.body;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if(err) {
                res.status(404).send("Invalid password field");
            }
            try {
                const [ _, [updatedUser ] ] = await Users.update(
                { ...userData, hashedPassword },
                    { returning: true, where: { id: req.params.id } }
                )
                res.json(updatedUser);;
            } catch(e) {
                res.status(500).send("Internal Server Error");
            }
        })
}

const getUser = async (req,res) => {
    try {
        const reqId = req.params.id;
        const user = await Users.findAll({
            include: [{
                model: Messages,
                attributes: ['name']
            }],
            attributes: ['id', 'name', 'surname'],
            where: {
                id: reqId
            }
        });
        if(user.length) {
            res.send(user);
        } else {
            res.status(404).send('There are no such an user');
        }
    } catch(e) {
        res.status(500).send(`${e}, ${req}`);
    }

}

const getUsers = async (req,res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'surname']
        });
        res.send(users);
    } catch(e){
        res.status(404).send();
    }
}

module.exports = {
    getUser,
    getUsers,
    signUp,
    signIn,
    editUser
}