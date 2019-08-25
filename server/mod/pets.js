export default (sequelize, DataTypes) => {
  const Pets = sequelize.define('pets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    age: DataTypes.STRING,
    breed: DataTypes.STRING,
    petType:DataTypes.ENUM('cat', 'dog'),
  
  },
    {
      freezeTableName: true,
      timestamps: false
    });

  Pets.associate = (models) => {
    Pets.hasMany(models.dog);
    Pets.hasMany(models.cat);

  };

  return Pets;
};
