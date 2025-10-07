const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Admin = sequelize.define(
    "Admin",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Directer", //default role
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true, // true = enable, false = disable
        }

    },
    {
        tableName: "admins",
        timestamps: true,
    }
);

module.exports = Admin;
