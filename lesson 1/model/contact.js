module.exports = (DataTypes, sequelize) => {
  const contact = sequelize.define(
    'contact',
    {
      permanent_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      tableName: 'Contacts',
    }
  );
  return contact;
};
