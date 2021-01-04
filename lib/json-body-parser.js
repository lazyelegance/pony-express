const readbody = require('./read-body');

const jsonBodyParser = async (req, res, next) => {
  let body = await readbody(req);
  req.body = JSON.parse(body);
  next();
};

module.exports = jsonBodyParser;
