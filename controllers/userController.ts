import { Request, Response, NextFunction } from "express";
import { readFileSync, writeFile } from "fs";
import { v4 as uuidv4 } from "uuid";
// import { registerSchema, loginSchema } from "../Schema/userSchema";
var dotenv = require("dotenv").config();
const Joi = require("joi");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const userDatabasePath = `${__dirname}/../userDatabase.json`;

if (!fs.existsSync(userDatabasePath)) {
  fs.writeFileSync(userDatabasePath, "[]");
}

const userDataDatabase = JSON.parse(readFileSync(userDatabasePath).toString());

const generateToken = (id: string) => {
  const limit = 60 * 2;
  const expiry = Math.floor(Date.now() / 1000) + limit;
  let payload: Ipayload = {
    id,
    exp: expiry,
  };
  let token = jwt.sign(payload, jwt_key);
  return token;
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if user exists
  userDataDatabase.forEach((user: IUser) => {
    if (user.email === email) {
      res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });
    }
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // createUser
  const user: IUser = {
    id: uuidv4().slice(0, 8),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  if (user) {
    let userToken = generateToken(user.id);
    res.cookie("Token", userToken);
  }

  // push file to database and write new user to database.
  userDataDatabase.push(user);
  writeFile(userDatabasePath, JSON.stringify(userDataDatabase), (err) => {
    if (err) {
      res.status(400).json({
        status: "Failed",
        message: "Could not write data to database",
      });
    } else {
      res.status(201).json({
        status: "Successful",
        message: "Registeration successful",
        data: {
          userId: user.id,
          username: user.name,
          useremail: user.email,
        },
      });
    }
  });
};

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // compare user info against database
  let matchUsers = userDataDatabase.find((el: IUser) => el.email === email);

  if (matchUsers) {
    const checkPasswords = await bcrypt.compare(password, matchUsers.password);
    if (checkPasswords) {
      const userToken = generateToken(matchUsers.id);
      res.cookie("Token", userToken);
      res.redirect("/books");
    } else {
      res.status(401).json({
        status: "failed",
        message:
          "Email or Password Incorrect. Check Your Details and Try Again!",
      });
    }
  } else {
    // slow down incase we didnt get a valid email so response time is similar
    const salt = await bcrypt.genSalt(10);
    const fakePassword = `$2a$${salt}$invalidusernameandpaaaaaaaaaaaaaaaaaaaa`;
    const comparePass = await bcrypt.compare(fakePassword, password);

    res.status(401).json({
      status: "failed",
      message: "Email or Password Incorrect. Check Your Details and Try Again!",
    });
  }
};

const displayUsers = (req: Request, res: Response) => {
  res.status(200).json({
    status: "Successful",
    data: {
      userDataDatabase,
    },
  });
};

export { generateToken, registerUser, userLogin, displayUsers };
