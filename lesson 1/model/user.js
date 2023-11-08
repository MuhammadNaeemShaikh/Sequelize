module.exports = (DataTypes, sequelize) => {
  const User = sequelize.define(
    'User',
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        get() {
          const rawValue = this.getDataValue('firstName');
          return rawValue
            ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
            : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
        defaultValue: 'Shaikh',
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('lastName', value + 'Pakistani');
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        },
      },
    },
    {
      tableName: 'Users', //table name wil be user
      // timestamps: false, //By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE. Those fields are automatically managed as well - whenever you use Sequelize to create or update something, those fields will be set correctly. The createdAt field will contain the timestamp representing the moment of creation, and the updatedAt will contain the timestamp of the latest update.
      // createdAt: false, //it will not create created at
      // updatedAt: true,//it will create only update at
      // updatedAt: 'updatedTimestamp', //it will create custom name
    }
  );
  return User;
};
