const {
  db: { user: User, otp: Otp, sequelize, Op },
} = require('../utils/db');
const emailSender = require('../utils/email');
const generateRandomNo = require('../utils/generatingRandomNo');
// const schedule = require('node-schedule');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signUP: async (req, res) => {
    try {
      const { email, password, confirmPass, role } = req.body;
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

      if (isEmailExist.length === 0) {
        await signUpfunc(email, password, role, res);
      } else {
        if (isEmailExist[0].isApprovedAccount === false) {
          await User.destroy({
            where: {
              userName: {
                [Op.eq]: email,
              },
            },
          });

          await signUpfunc(email, password, role, res);
        } else {
          error = new Error('This Email Already in Use');
          error.statusCode = 400; // Set the status code for the error
          throw error;
        }
      }
    } catch (error) {
      const statusCode = error.statusCode || 500; // Default to 500 if no status code is provided
      console.error(error);
      res.status(statusCode).json({
        success: false,
        err: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //email exist in db or not
      const user = await User.findOne({
        where: {
          userName: email,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          err: 'Email not found',
        });
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          err: 'Invalid password',
        });
      }

      const accessToken = await generateAccessToken(user.dataValues);

      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
};

//shedule a cron job to run on every minute

// const job = schedule.scheduleJob('* * * * *', async () => {
//   try {
// const now = new Date();
// const expirationTime = new Date(now.getTime() - 2 * 60 * 1000); // Two minutes ago

// // Delete expired records
// await Otp.destroy({
//   where: {
//     expiresIn: {
//       [Op.lt]: expirationTime,
//     },
//   },
// });

// console.log('Expired OTP records deleted successfully.');
//   } catch (error) {
//     console.error('Error deleting expired OTP records:', error);
//   }
// });

//sign up function
let signUpfunc = async (email, password, role, res) => {
  const createUserRecord = await User.create({
    userName: email,
    password,
    role,
  });

  const token = await new generateRandomNo(4);
  const generateToken = await token.generateOtp();

  //sending email
  const emailOptions = {
    to: email,
    subject: 'Welcome to Our Community!',
    html: `
    <p>Dear User,</p>
    
    <p>Congratulations! You're one step away from joining our vibrant community. To complete your registration, please use the following token:</p>
  
    <h2>${generateToken}</h2>
  
    <p>Please enter this token in the designated field to approve your account. If you have any questions or need assistance, feel free to reply to this email. We're here to help!</p>
  
    <p>Best regards,</p>
    <p>The [Your Company Name] Team</p>
  `,
  };

  await emailSender(emailOptions);

  //create otp and save otp in model

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 2);

  console.log('initialTime', expirationTime);

  await Otp.create({
    email,
    code: generateToken,
    expiresIn: expirationTime,
  });

  res.status(200).json('Kindly Check Your Email');

  setTimeout(async () => {
    try {
      const deletionTime = new Date(Date.now() + 2 * 60 * 1000);

      console.log('deletingTime', deletionTime);

      // Delete expired records
      await Otp.destroy({
        where: {
          expiresIn: {
            [Op.lt]: deletionTime,
          },
        },
      });

      console.log('Expired OTP records deleted successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  }, 2 * 60 * 1000);
};

//generate Access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      isAdmin: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: '3d' }
  );
};
