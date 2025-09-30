// const { sequelize } = require("../db/db"); // agar transaction use karna ho
const Notification = require('../models/notification.model');

const notificationService = {

    addNotification: async (data, transaction = null) => {
        try {
            return await Notification.create(data, { transaction });
        } catch (err) {
            console.error("Error adding notification:", err);
            throw err;
        }
    },

    getNotifications: async (filter = {}) => {
        try {
            return await Notification.findAll({
                where: filter,
                order: [["createdAt", "DESC"]],
            });
        } catch (err) {
            console.error("Error fetching notifications:", err);
            throw err;
        }
    },


    markAsRead: async (notificationId) => {
        try {
            const notification = await Notification.findByPk(notificationId);
            if (!notification) return null;

            notification.read = true;
            await notification.save();

            return notification;
        } catch (err) {
            console.error("Error marking notification as read:", err);
            throw err;
        }
    },

    deleteNotification: async (notificationId) => {
        try {
            return await Notification.destroy({ where: { id: notificationId } });
        } catch (err) {
            console.error("Error deleting notification:", err);
            throw err;
        }
    },
};

module.exports = notificationService;
