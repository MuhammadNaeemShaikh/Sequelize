const { db } = require('../utils/db');

let User = db.user;

//add user

let addUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const createUser = User.build({
      firstName,
      lastName,
    });
    await createUser.save();
    res.status(200).json(createUser);
  } catch (error) {
    console.log('Something Went Wrong', error);
    res.status(400).json('Something Went Wrong');
  }
};

//get all users
let getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    data.length > 0
      ? res.status(200).json(data)
      : res.status(200).json('No Data Found');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong');
  }
};

//get single user

let getUser = async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id },
  });
  if (data === null) {
    return res.status(400).json({ status: false, message: 'No Data Found' });
  }

  res.status(200).json(data);
};

let postUser = async (req, res) => {
  try {
    let postedData;
    if (typeof req.body === 'object') {
      postedData = await User.bulkCreate(req.body);
    } else {
      postedData = await User.create(req.body);
    }
    res.status(200).json(postedData);
  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong');
  }
};

let updateUser = async (req, res) => {
  try {
    const updateUser = await User.update(...req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updateUser);

  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong');
  }
};

let delUser = async (req, res) => {
  try {
    const delUser = await User.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(delUser);
  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong');
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUser,
  delUser,
  updateUser,
};
