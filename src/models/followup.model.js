const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const Lead = require("./lead.model");

const FollowUp = sequelize.define(
    "FollowUp",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        clientName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        followUpByName: {
            type: DataTypes.STRING,
            allowNull: true,
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
            type: DataTypes.ENUM("Pending", "Rejected", "Approved"),
            defaultValue: "Pending",
        },

        // notes: {
        //     type: DataTypes.TEXT,
        //     allowNull: true,
        // },

        nextFollowUpDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        // approvedBy: {
        //     type: DataTypes.INTEGER, // userId  approver
        //     allowNull: true,
        // },

        // rejectedBy: {
        //     type: DataTypes.INTEGER, // userId of who rejected
        //     allowNull: true,
        // },

        // doneBy: {
        //     type: DataTypes.INTEGER, //  follow-up complete 
        //     allowNull: true,
        // },

        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        // notifyAdmin: {
        //     type: DataTypes.BOOLEAN,    // Notify Admin 
        //     defaultValue: false,
        // },

        // assignedTo: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true, // userId
        // },

        whatsappNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //  user ka response
        // response: {
        //     type: DataTypes.ENUM(
        //         "Positive",
        //         "Negative",
        //         "Pending",
        //         "Interested but negotiating"
        //     ),
        //     allowNull: true,
        // },


        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        quotations: {
            type: DataTypes.ARRAY(DataTypes.STRING), // store uploaded file names
            defaultValue: [],
        },

        // updatedBy: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },

    },
    {
        tableName: "followup",
        timestamps: true,
    }
);

FollowUp.belongsTo(Lead, { foreignKey: "leadId", as: "lead", onDelete: "CASCADE", onUpdate: "CASCADE" });
module.exports = FollowUp;
