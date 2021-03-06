const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { nextTick } = require('process');
const emails = require('../fixtures/emails.json');
const enforce = require('../lib/enforce');
const generatedId = require('../lib/generate-id');
const NotFound = require('../lib/not-found');
const requireAuth = require('../lib/require-auth');

let upload = multer({ dest: path.join(__dirname, '../uploads') });

let getEmailsRoute = (req, res) => {
  res.send(emails);
};

let getEmailRoute = (req, res) => {
  console.log(req.params);
  let email = emails.find((e) => e.id === req.params.id);
  if (!email) {
    throw new NotFound();
  }

  res.send(email);
};

let createEmailRoute = async (req, res) => {
  let attachments = (req.files || []).map((file) => file.filename);
  let newEmail = { ...req.body, id: generatedId(), attachments };
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
};

let updateEmailRoute = async (req, res) => {
  let email = emails.find((e) => e.id === req.params.id);
  req.authorize(email);
  Object.assign(email, req.body);
  res.status(200);
  res.send(email);
};

let deleteEmailRouter = (req, res) => {
  let email = emails.find((e) => e.id === req.params.id);
  req.authorize(email);
  let index = emails.findIndex((e) => e.id === req.params.id);
  emails.splice(index, 1);
  res.sendStatus(204);
};

let updateEmailPolicy = (user, email) => user.id === email.from;

let deleteEmailPolicy = (user, email) => user.id === email.to;

let emailsRouter = express.Router();
emailsRouter.use(requireAuth);
emailsRouter
  .route('/')
  .get(getEmailsRoute)
  .post(bodyParser.json(), upload.array('attachments'), createEmailRoute);
emailsRouter
  .route('/:id')
  .get(getEmailRoute)
  .patch(enforce(updateEmailPolicy), bodyParser.json(), updateEmailRoute)
  .delete(enforce(deleteEmailPolicy), deleteEmailRouter);

module.exports = emailsRouter;
