export default (sequelize, DataTypes) => {
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      references: 'pets',
      referencesKey: 'id'
    },
    catThings: DataTypes.JSONB,
  },
    {
      freezeTableName: true,
    });

  return Dog;
};
