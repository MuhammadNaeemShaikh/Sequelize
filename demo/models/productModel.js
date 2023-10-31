module.exports = (DataTypes, sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        set(value) {
          this.setDataValue('productName', value.toLowerCase());
        },
      },
      productCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        set(value) {
          this.setDataValue('productCategory', value.toLowerCase());
        },
      },
      productDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Only Alphabetic Characters Are allowed',
          },
        },
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {},
      },
    },
    {
      tableName: 'Products',
    }
  );
  return Product;
};
