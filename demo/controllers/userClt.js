const {
  db: { user: User, otp: Otp, sequelize, Op },
} = require('../utils/db');

module.exports = {
  verifyOtp: async (req, res) => {
    try {
      const { email, code } = req.body;

      const isOtpVerify = await Otp.findAll({
        where: {
          email,
          code,
        },
      });

      if (isOtpVerify.length > 0) {
        await User.update(
          { isApprovedAccount: true },
          {
            where: {
              userName: email,
            },
          }
        );

        await Otp.destroy({
          where: {
            email,
            code,
          },
        });

        res.status(200).json({
          success: true,
          msg: 'OTP VERIFIED',
        });
      } else {
        res.status(400).json({
          success: false,
          msg: 'Otp Not Found',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
  completeProfile: async (req, res) => {
    try {
      const { firstName, middleName, lastName, address, contactNo, email } =
        req.body;

      const updatedProfile = await User.update(
        {
          ...req.body,
        },
        {
          where: {
            userName: email,
          },
        }
      );

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
};
