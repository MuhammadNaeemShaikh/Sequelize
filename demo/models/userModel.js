const { Sequelize } = require('sequelize');

module.exports = (DataTypes, sequelize) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'na',
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        get() {
          const rawValue = this.getDataValue('firstName');
          return rawValue
            ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
            : null;
        },
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'na',
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        get() {
          const rawValue = this.getDataValue('middleName');
          return rawValue
            ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
            : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'na',
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        get() {
          const rawValue = this.getDataValue('lastName');
          return rawValue
            ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
            : null;
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please Enter Correct Email Format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please Enter Your Password',
          },
          len: {
            args: [8, 100],
            msg: 'Please enter a password between 8 and 100 characters',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'na',
        validate: {
          isLowercase: {
            msg: 'Please enter your Address in Lower Case Letter',
          },
        },
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'na',
      },
    },
    {
      tableName: 'Users',
    }
  );
  return User;
};
