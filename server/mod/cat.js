export default (sequelize, DataTypes) => {
    const Cat = sequelize.define('cat', {
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
            timestamps: false
        });

    return Cat;
};
