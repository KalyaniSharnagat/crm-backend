
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
const createQuotation = require("../controller/quotation/createQuotation");
const deleteQuotation = require("../controller/quotation/deleteQuotation");
const getAllQuotations = require("../controller/quotation/getAllQuotations");
const getQuotationById = require("../controller/quotation/getQuotationById");
const getQuotationList = require("../controller/quotation/getQuotationList");
const updateQuotation = require("../controller/quotation/updateQuotation");


const authenticateAdminJwt = require("../utils/middleware/authentication-admin-jwt");
const updateWork = require("../controller/work/update-work");
const getAssignList = require("../controller/lead/assign-list");



const adminRouter = require("express").Router();

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/delete-admin", authenticateAdminJwt, deleteAdmin);
adminRouter.get("/get-all-admin-details", authenticateAdminJwt, getAllAdminDetails);

//lead routes

adminRouter.post("/create-lead", authenticateAdminJwt, createLead);
adminRouter.post("/update-lead", authenticateAdminJwt, updateLead);
adminRouter.post("/delete-lead", authenticateAdminJwt, deleteLead);
adminRouter.post("/get-lead-list", authenticateAdminJwt, getLeadList);
adminRouter.post("/get-lead-by-id", authenticateAdminJwt, getLeadById);
adminRouter.get("/get-assign-list", authenticateAdminJwt, getAssignList);

//quotation routes

adminRouter.post("/create-quotation", authenticateAdminJwt, createQuotation);
adminRouter.post("/update-quotation", authenticateAdminJwt, updateQuotation);
adminRouter.post("/delete-quotation", authenticateAdminJwt, deleteQuotation);
adminRouter.get("/get-all-quotations", authenticateAdminJwt, getAllQuotations);
adminRouter.post("/get-quotation-by-id", authenticateAdminJwt, getQuotationById);
adminRouter.post("/get-quotation-list", authenticateAdminJwt, getQuotationList);


// work route
adminRouter.post("/create-work", authenticateAdminJwt, createWork);
adminRouter.post("/update-work", authenticateAdminJwt, updateWork);
module.exports = adminRouter;
