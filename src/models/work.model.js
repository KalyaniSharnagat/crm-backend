const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Work = sequelize.define(
    "Work",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        workId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // "W-1001"
        },

        leadName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        quotationNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
            defaultValue: "Not Started",
        },

        assignedTo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "works", // Existing table
        timestamps: true,   // createdAt, updatedAt
    }
);

// Associations 

// Work.associate = (models) => {
//     Work.belongsTo(models.Lead, { foreignKey: "leadId", as: "lead" });
//     Work.belongsTo(models.Quotation, { foreignKey: "quotationId", as: "quotation" });
// };

module.exports = Work;
