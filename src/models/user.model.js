const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: "use",
        timestamps: true,
    }
);

module.exports = User;
