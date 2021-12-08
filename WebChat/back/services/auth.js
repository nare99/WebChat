const Users = require('../models/Users');
const jwt = require('jwt-simple');
require('dotenv').config();

const generateToken = async (req, res) => {
    try {
      const user = await Users.findOne({ where: { email: req.body.email }});
      if(!user) {
        res.send(401, 'Unauthorized............');
        return;
      };
      const payload = { id: user.id };
      const access_token = jwt.encode(payload, process.env.SECRET);
      res.send({ access_token, user });
    } catch(e) {
      res.send(500);
    }
}

const authenticate = async (req, res, next) => {

  let { access_token } = req.headers;
  if(!access_token) {
      res.status(401).send(`Unauthorized`);
      return;
  }

  try {

    const payload = jwt.decode(access_token, process.env.SECRET, false, 'HS256');
    if(!payload || !payload.id) {
      res.status(401).send('Invalid token')
      return;
    };

    const user = await Users.findOne({ where: { id: payload.id }});
    if(!user) {
      res.status(401).send('Unauthorized');
      return;
    };

    next();

  } catch(e) {
    res.status(500).send(e);
  }
}

const authenticate2 = async (access_token) => {
  if(!access_token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {

    const payload = jwt.decode(access_token, process.env.SECRET, false, 'HS256');
    if(!payload || !payload.id) {
      res.status(401).send('Invalid token')
      return;
    };

    const user = await Users.findOne({ where: { id: payload.id }});
    if(!user) {
      res.status(401).send('Unauthorized');
      return;
    };
  } catch(e) {
    res.status(500).send(e);
  }
}


module.exports = {
    generateToken,
    authenticate,
    authenticate2
}
