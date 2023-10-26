const { db } = require('../utils/db');

let Employee = db.employee;

let addEmployee = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const createEmployee = await Employee.create({
      firstName,
      lastName,
    });

    res.status(200).json(createEmployee);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something Went Wrong');
  }
};

module.exports = {
  addEmployee,
};
