module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("tbl_admin", {
        admin_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        admin_username: {
            type: DataTypes.STRING(100),
            index: true,
            allowNull: false,
        },
        admin_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        admin_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        admin_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        admin_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            length: 1
        }
    }, {
        createdAt: "admin_added",
        updatedAt: false
    })
    return Admin;
}