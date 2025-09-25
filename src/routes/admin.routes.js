
const createAdmin = require("../controller/admin/create-admin");
const deleteAdmin = require("../controller/admin/delete-admin");
const getAllAdminDetails = require("../controller/admin/get-all-admin-details");
const login = require("../controller/admin/login-admin");
const authenticateAdminJwt = require("../utils/middleware/authentication-admin-jwt");



const adminRouter = require("express").Router();

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/delete-admin", authenticateAdminJwt, deleteAdmin);
adminRouter.post("/get-all-admin-details", authenticateAdminJwt, getAllAdminDetails);



module.exports = adminRouter;
