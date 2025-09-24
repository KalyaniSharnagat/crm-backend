
const createAdmin = require("../controller/admin/create-admin");
const login = require("../controller/admin/login-admin");



const adminRouter = require("express").Router();

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
// adminRouter.post("/get-user-by-id", authenticateUserJWT, getuserById);




module.exports = adminRouter;
