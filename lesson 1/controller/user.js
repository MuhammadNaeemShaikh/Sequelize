const { db } = require('../utils/db');

let User = db.user;

let addUser = async (req, res) => {
  console.log('hit');
  const { firstName, lastName } = req.body;
  const createUser = User.build({
    firstName,
    lastName,
  });
  await createUser.save();
  res.status(200).json(createUser);
};

module.exports = {
  addUser,
};
