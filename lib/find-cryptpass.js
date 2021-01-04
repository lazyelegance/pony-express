const bcrypt = require('bcrypt');

const cryptpass = async (p) => {
  const saltRounds = 10;
  let hashed = await bcrypt.hash(p, saltRounds);
  console.log({ p, hashed });
  return hashed;
};
module.exports = cryptpass;
