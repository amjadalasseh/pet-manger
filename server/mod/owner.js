export default (sequelize, DataTypes) => {
  const Owner = sequelize.define('owner', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    // petsId: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: 'pets',
    //   referencesKey: 'id'
    // }
  },
    {
      freezeTableName: true,
      timestamps: false
    });

  Owner.associate = (models) => {
    Owner.hasMany(models.pets);
  };

  return Owner;
};
