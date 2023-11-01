module.exports = (DataTypes, sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: {
            msg: 'Please enter your Name in Lower Case Letter',
          },
        },
        set(value) {
          this.setDataValue('Address', value.toLowerCase());
        },
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Orders',
    }
  );
  return Order;
};
