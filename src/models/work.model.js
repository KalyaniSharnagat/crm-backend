const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Work = sequelize.define('Work', {
     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    workId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // e.g. "W-1001"
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
      type: DataTypes.STRING, // OR keep only assignedToUserId if you use User FK
      allowNull: true,
    },
  },
  {
    tableName: "works",
    timestamps: true, // createdAt, updatedAt
  });

  // 🔹 Associations
  Work.associate = (models) => {
    // One Work belongs to one Quotation
    Work.belongsTo(models.Quotation, {
      foreignKey: "quotationId",
      as: "quotation",
    });

    // One Work is related to one Lead (approved)
    Work.belongsTo(models.Lead, {
      foreignKey: "leadId",
      as: "lead",
    });

    // Assigned to (User/Employee)
    Work.belongsTo(models.User, {
      foreignKey: "assignedToUserId",
      as: "assignedToUser",
    });
  }

module.exports = Work;
