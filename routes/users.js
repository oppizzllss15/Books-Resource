"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const userSchema_1 = require("../Schema/userSchema");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get("/data", userController_1.displayUsers);
router.route("/register").post(userSchema_1.validateUserReg, userController_1.registerUser);
router.route("/login").post(userSchema_1.validateLogin, userController_1.userLogin);
// router.route("/userdata").get(loggedInUser);
module.exports = router;
