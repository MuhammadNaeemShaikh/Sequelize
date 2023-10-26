module.exports = (Model, sequelize, DataTypes) => {
  class Employee extends Model {}

  Employee.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Shaikh',
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instanceF
      modelName: 'Employee', // We need to choose the model name
      createdAt: false,
    }
  );
  return Employee;
};
