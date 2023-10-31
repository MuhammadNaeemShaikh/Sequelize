
  
module.exports = (DataTypes, sequelize) => {
  const otp = sequelize.define(
    'otp',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please Provide Correct Email',
          },
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        },
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: (otp, options) => {
          otp.expiresIn = new Date();
          otp.expiresIn.setMinutes(otp.expiresIn.getMinutes() + 2); // Set expiresIn to 2 minutes from now
        },
      },
    }
  );
  return otp;
};
