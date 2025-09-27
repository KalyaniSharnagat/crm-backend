const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const FollowUp = sequelize.define(
    "FollowUp",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        leadId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        followUpDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        mode: {
            type: DataTypes.ENUM("Call", "Email", "Meeting", "Message", "WhatsApp", "Other"),
            defaultValue: "Call",
        },

        status: {
            type: DataTypes.ENUM("Scheduled", "Done", "Pending", "Cancelled", "Rejected", "Approved"),
            defaultValue: "Scheduled",
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        nextFollowUpDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        approvedBy: {
            type: DataTypes.INTEGER, // userId  approver
            allowNull: true,
        },

        rejectedBy: {
            type: DataTypes.INTEGER, // userId of who rejected
            allowNull: true,
        },

        doneBy: {
            type: DataTypes.INTEGER, //  follow-up complete 
            allowNull: true,
        },

        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        notifyAdmin: {
            type: DataTypes.BOOLEAN,    // Notify Admin 
            defaultValue: false,
        },

        assignedTo: {
            type: DataTypes.INTEGER,   // Assigned to user (salesLead / Team lead ..)
            allowNull: true, // userId
        },

        whatsappNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        priority: {
            type: DataTypes.ENUM("Low", "Medium", "High"),
            defaultValue: "Medium",
        },
        outcome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //  user ka response
        response: {
            type: DataTypes.ENUM(
                "Positive",
                "Negative",
                "Pending",
                "Interested but negotiating" // 👈 नया value
            ),
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },
    {
        tableName: "followup",
        timestamps: true,
    }
);

module.exports = FollowUp;
