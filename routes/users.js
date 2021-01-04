const express = require('express');
const users = require('../fixtures/users.json');
const NotFound = require('../lib/not-found');

let getUsersRoute = (req, res) => {
  res.send(users);
};

let getUserRoute = (req, res) => {
  console.log(req.params);
  let user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new NotFound();
  }
  res.send(user);
};

let usersRouter = express.Router();
usersRouter.get('/', getUsersRoute);
usersRouter.get('/:id', getUserRoute);

module.exports = usersRouter;
