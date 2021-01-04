const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const findUser = require('../lib/find-user');

let createToken = (user) => {
  const signature = process.env.SIGNATURE;

  return jwt.sign({ userId: user.id }, signature, { expiresIn: '7d' });
};

let createTokenRoute = (req, res) => {
  let credentials = req.body;
  let user = findUser.byCredentials(credentials);

  if (user) {
    let token = createToken(user);
    res.status(201);
    res.send(token);
  } else {
    res.sendStatus(422);
  }
};

let tokensRouter = express.Router();

tokensRouter.post('/', bodyParser.json(), createTokenRoute);

module.exports = tokensRouter;
