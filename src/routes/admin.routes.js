
const createAdmin = require("../controller/admin/create-admin");
const deleteAdmin = require("../controller/admin/delete-admin");
const getAllAdminDetails = require("../controller/admin/get-all-admin-details");
const login = require("../controller/admin/login-admin");
const createLead = require("../controller/lead/create-lead");
const deleteLead = require("../controller/lead/delete-lead");
const getLeadById = require("../controller/lead/get-lead-by-id");
const getLeadList = require("../controller/lead/get-lead-list");
const updateLead = require("../controller/lead/update-lead");
const createWork = require("../controller/work/create-work");


const authenticateAdminJwt = require("../utils/middleware/authentication-admin-jwt");



const adminRouter = require("express").Router();

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/delete-admin", authenticateAdminJwt, deleteAdmin);
adminRouter.get("/get-all-admin-details", authenticateAdminJwt, getAllAdminDetails);

//lead routes

adminRouter.post("/create-lead", createLead);
adminRouter.post("/update-lead", authenticateAdminJwt, updateLead);
adminRouter.post("/delete-lead", authenticateAdminJwt, deleteLead);
adminRouter.post("/get-lead-list", authenticateAdminJwt, getLeadList);
adminRouter.post("/get-lead-by-id", authenticateAdminJwt, getLeadById);


// work route
adminRouter.post("/create-work", authenticateAdminJwt, createWork);

module.exports = adminRouter;
