module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define("test", {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i
            }
        }
    }, {
        paranoid: true,      // Enable soft deletes
        deletedAt: 'deletedAt_test'
    });
    return Test
}

