import { Request, Response, NextFunction } from "express";
import {
  generateToken,
  registerUser,
  userLogin,
  displayUsers,
} from "../controllers/userController";
import { validateLogin, validateUserReg } from "../Schema/userSchema";
import { verifyJWT } from "../middleware/authentication";

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/:page", function (req: Request, res: Response, next: NextFunction) {
  if (req.params.page === 'signup') {
    return res.render('signup', { title: 'Sign up' });
  }
  if(req.params.page === 'login') {
    return res.render('login', { title: 'Login' });
  }
});

router.get("/data", displayUsers);
router.route("/register").post(validateUserReg, registerUser);

router.route("/login").post(validateLogin, userLogin);

// router.route("/userdata").get(loggedInUser);

module.exports = router;
