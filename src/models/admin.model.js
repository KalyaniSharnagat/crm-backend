const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Crm = sequelize.define("Crm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        // validate: { isEmail: true },
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // role: {
    //     type: DataTypes.ENUM("admin", "superadmin"),
    //     defaultValue: "admin",
    // },
    // resetToken: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // resetTokenExpiry: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    // },
},
    {
        tableName: "crm",
        timestamps: true,
        defaultScope: {
            raw: true   // 👈 this makes all queries return plain JSON
        }
    });

module.exports = Crm;
