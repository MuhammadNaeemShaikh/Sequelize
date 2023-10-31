const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (DataTypes, sequelize) => {
  const User = sequelize.define(
    'User',
    {
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
        set(value) {
          this.setDataValue('role', value.toLowerCase());
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
        set(value) {
          this.setDataValue('firstName', value.toLowerCase());
        },
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
        set(value) {
          this.setDataValue('middleName', value.toLowerCase());
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
        set(value) {
          this.setDataValue('lastName', value.toLowerCase());
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
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      isApprovedAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      tableName: 'Users',
    }
  );
  return User;
};
