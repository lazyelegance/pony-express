const bcrypt = require('bcrypt');
const users = require('../fixtures/users.json');

const isMatch = async (p, hashed) => {
  const result = await bcrypt.compare(p, hashed);
  return !!result;
};

const findUserByCredentials = ({ username, password }) => {
  return users.find(
    (user) => user.username === username && isMatch(password, user.password)
  );
};

exports.byCredentials = findUserByCredentials;
