const { db } = require('../utils/db');
const { Sequelize, Op } = require('sequelize');
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

const getUserUsingPag = async (req, res) => {
  try {
    const { pages, limit } = req.body;

    const data = await User.findAll({
      offset: pages * limit,
      limit: limit,
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong');
  }
};

const queryUser = async (req, res) => {
  // try {
  //   const data = await User.findAll({
  //     group: 'lastName',
  //     // order: [['id', 'DESC']],
  //   });
  //   res.status(200).json(data);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json('Some thing Went Wrong');
  // }
  // try {
  //   await User.destroy({
  //     truncate: true,
  //   });
  //   res.status(200).json('Deleted');
  // } catch (error) {
  //   console.log(error);
  //   res.status(200).json('Some thing Went Wrong!');
  // }
  // try {
  //   const data = await User.findAll({
  //     where: {
  //       [Op.and]: [{ firstName: 'Muhammad' }, { lastName: 'Shaikh' }],
  //     },
  //   });
  //   res.status(200).json(data)
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json('Something Went Wrong');
  // }
  // try {
  //   const data = await User.findAll({
  //     where: {
  //       id: {
  //         [Op.eq]: 1,
  //       },
  //     },
  //   });
  //   res.status(200).json(data);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json('Some thing Went Wrong!');
  // }
  // exclude fields
  // try {
  //   const data = await User.findAll({
  //     attributes: [
  //       'firstName',
  //       [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'firstName'] // To add the aggregation...
  //     ],
  //     group:['firstName']
  //   });
  //   res.status(200).json(data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json('Something Went Wrong');
  // }
  // count fields using sequelize
  // const data = await User.findAll({
  //   attributes: [
  //     ['firstName', 'first_name'], //alias as
  //     [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'count'],
  //   ],
  //   group: ['firstName'],
  // });
  // res.status(200).json(data);
  // alias firstName as first_name
  // const data = await User.findAll({
  //   attributes: ['id', ['firstName', 'first_name']],
  // });
  // res.status(200).json(data);
  //   It will only accepts which we are mentioned in the fields;
  // If we want to find out specifics field in the tables:
  // const data = await User.findAll({
  //   attributes: ['firstName'],
  // });
  // res.status(200).json(data);
  // It will add only firstName in the database:
  // const data = await User.create(
  //   {
  //     firstName: 'Muhammad',
  //     lastName: 'Naeem',
  //   },
  //   { fields: ['firstName'] }
  // );
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUser,
  delUser,
  updateUser,
  queryUser,
  getUserUsingPag,
};
