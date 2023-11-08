const { db } = require('../utils/db');
const { Sequelize, Op, QueryTypes } = require('sequelize');
let { user, contact } = db;
let User = user;
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

let finder = async (req, res) => {
  try {
    //find all
    // const data = await User.findAll({}); //find all will return all the field
    // const data = await User.findOne({
    //   where: {
    //     id: {
    //       [Op.eq]: 2,
    //     },
    //   },
    // });

    // //find one will return only one field

    // const data = await User.findOne({
    //   where: {
    //     lastName: {
    //       [Op.eq]: 'Ahmed',
    //     },
    //   },
    // });

    // //find by pk

    // const data = await User.findByPk(2);

    // // find and count all
    // const { count, rows } = await User.findAndCountAll({
    //   where: {
    //     lastName: {
    //       [Op.eq]: 'Ahmed',
    //     },
    //   },
    // });

    // res.status(200).json({
    //   count: count,
    //   rows: rows,
    // });

    //find or create

    const [user, create] = await User.findOrCreate({
      where: {
        firstName: 'Shaikoo',
      },
    });

    res.status(200).json({
      user: user,
      create: create,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

let getSetAndVirtual = async (req, res) => {
  try {
    const data = await User.findAll({
      order: [['id', 'DESC']],
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

let validationAndConstraint = async (req, res) => {
  try {
    const data = await User.create({
      firstName: 'Muhammad12',
      lastName: 'Naeem',
      userName: 'muhammadnaeemshaikh11@gmail.com',
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    let message;
    let messages = {};
    err.errors.forEach((error) => {
      console.log(error.validatorKey, 'error.validatorKey');
      switch (error.validatorKey) {
        case 'isAlpha':
          message = 'Only Alphabets Are Allowed';
          break;
      }

      messages[error.path] = message;
    });
    res.status(500).json(messages);
  }
};

let rawQueries = async (req, res) => {
  try {
    // const users = await db.sequelize.query('SELECT * FROM `users`', {
    //   type: QueryTypes.SELECT,
    // });

    const users = await db.sequelize.query('SELECT * FROM `users`', {
      type: QueryTypes.SELECT,
      model: User,
      mapToModel: true,
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//<--------------------------------------------one to one ---------------------------------------->
const oneToOne = async (req, res) => {
  try {
    // const data = await User.create({
    //   firstName: 'Virat',
    //   lastName: 'Kholi',
    //   userName: 'viratkholi12@gmail.com',
    // });
    // if (data && data.id) {
    //   await contact.create({
    //     permanent_Address: 'Tando Adam',
    //     current_Address: 'Drig Road,KHI',
    //     user_id: data.id,
    //   });
    // }

    // const data = await User.findAll({
    //   attributes: ['firstName', 'lastName'],
    //   include: [
    //     {
    //       model: contact,
    //       attributes: ['permanent_Address', 'current_Address'],
    //     },
    //   ],
    // });

    // const data = await User.findAll({
    //   attributes: ['firstName', 'lastName'],
    //   include: [
    //     {
    //       model: contact,
    //       as:'contactDetail',
    //       attributes: ['permanent_Address', 'current_Address'],
    //     },
    //   ],
    //   where:{
    //     id:3
    //   }
    // });

    const data = await contact.findAll({
      attributes: ['permanent_Address', 'current_Address'],
      include: [
        {
          model: User,
          as: 'userDetails',
          attributes: ['firstName', 'lastName'],
        },
      ],
      where: {
        id: 2,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//<--------------------------------------------one to many ---------------------------------------->

const oneToMany = async (req, res) => {
  try {
    // const user = await User.create({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   userName: req.body.userName,
    // });
    // if (user && user.id) {
    //   const contactDataArray = req.body.contactData; // Assuming contactData is an array in the request body
    //   const createdContacts = [];
    //   for (const contactData of contactDataArray) {
    //     const createdContact = await contact.create({
    //       permanent_Address: contactData.permanent_Address,
    //       current_Address: contactData.current_Address,
    //       user_id: user.id,
    //     });
    //     createdContacts.push(createdContact);
    //   }
    //   res.status(200).json({ user, createdContacts });
    // }
    // const data = await User.findAll({
    //   attributes: ['firstName', 'lastName','userName'],
    //   include: [
    //     {
    //       model: contact,
    //       as: 'contactDetail',
    //       attributes: ['permanent_Address', 'current_Address'],
    //     },
    //   ],
    //   // where: {
    //   //   id: 1,
    //   // },
    // });
    // res.status(200).json(data);
    // const data = await contact.findAll({
    //   attributes: ['permanent_Address', 'current_Address'],
    //   include: [
    //     {
    //       model: user,
    //       as: 'userDetails',
    //       attributes: ['firstName', 'lastName', 'userName'],
    //     },
    //   ],
    //   // where: {
    //   //   id: 1,
    //   // },
    // });
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//<--------------------------------------------many to many ---------------------------------------->

const manytoMany = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    });

    if (user && user.id) {
      const createdContact = await contact.create({
        permanent_Address: req.body.permanent_Address,
        current_Address: req.body.current_Address,
      });

      await user.setContacts(createdContact);

      res.status(200).json({ user, createdContact });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Something Went Wrong ');
  }
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
  finder,
  getSetAndVirtual,
  validationAndConstraint,
  rawQueries,
  oneToOne,
  oneToMany,
  manytoMany,
};
