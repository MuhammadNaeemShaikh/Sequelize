const {
  db: { user: User },
} = require('../utils/db');

module.exports = {
  signUP: async (req, res) => {
    try {
      const { email, password, confirmPass } = req.body;
      let error;

      if (password !== confirmPass) {
        error = new Error('Password and Confirm password do not match');
        error.statusCode = 400; // Set the status code for the error
        throw error;
      }

      const isEmailExist = await User.findAll({
        where: {
          userName: email,
        },
      });

      res.status(200).json(isEmailExist);

      if (isEmailExist.length === 0) {
        // const createUserRecord = await User.create({
        //   userName: email,
        //   password,
        // });

        // res.status(200).json(createUserRecord);
        //sending email
      } else {
        error = new Error('This Email Already in Use');
        error.statusCode = 400; // Set the status code for the error
        throw error;
      }

      res.status(200).json(isEmailExist.length);

      //   const createRecord = await user.create({
      //     userName: email,
      //   });
    } catch (error) {
      const statusCode = error.statusCode || 500; // Default to 500 if no status code is provided
      console.error(error);
      res.status(statusCode).json({
        success: false,
        err: error.message,
      });
    }
  },
};
