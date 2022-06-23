import { Request, Response, NextFunction } from "express";
import {
  generateToken,
  registerUser,
  userLogin,
  displayUsers,
} from "../controllers/userController";
import { validateLogin, validateUserReg } from "../Schema/userSchema";

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.get("/data", displayUsers);
router.route("/register").post(validateUserReg, registerUser);

router.route("/login").post(validateLogin, userLogin);

// router.route("/userdata").get(loggedInUser);

module.exports = router;
