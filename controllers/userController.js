"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayUsers = exports.userLogin = exports.registerUser = exports.generateToken = void 0;
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
// import { registerSchema, loginSchema } from "../Schema/userSchema";
var dotenv = require("dotenv").config();
const Joi = require("joi");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = (id) => {
    const limit = 60 * 5;
    const expiry = Math.floor(Date.now() / 1000) + limit;
    let payload = {
        id,
        exp: expiry,
    };
    let token = jwt.sign(payload, jwt_key);
    return token;
};
exports.generateToken = generateToken;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    // if (password !== confirmPassword) {
    //   res.render("signup", { message: "Password does not match" });
    // }
    // check if user exists
    utils_1.userDataDatabase.forEach((user) => {
        if (user.email === email) {
            res.status(400).json({
                status: "Failed",
                message: "Email already exists",
            });
        }
    });
    // Hash password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    // createUser
    const user = {
        id: (0, uuid_1.v4)().slice(0, 8),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    };
    // push file to database and write new user to database.
    utils_1.userDataDatabase.push(user);
    (0, fs_1.writeFile)(utils_1.userDatabasePath, JSON.stringify(utils_1.userDataDatabase), (err) => {
        if (err) {
            res.status(400).json({
                status: "Failed",
                message: "Could not write data to database",
            });
        }
        else {
            if (user) {
                let userToken = generateToken(user.id);
                res.status(201);
                res.cookie("Token", userToken);
                return res.redirect("/users/login");
                // .json({
                //   status: "Successful",
                //   message: "Registeration successful",
                //   data: {
                //     userId: user.id,
                //     username: user.name,
                //     useremail: user.email,
                //   },
                // });
            }
            // res.status(201).json({
            //   status: "Successful",
            //   message: "Registeration successful",
            //   data: {
            //     userId: user.id,
            //     username: user.name,
            //     useremail: user.email,
            //   },
            // });
        }
    });
});
exports.registerUser = registerUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // compare user info against database
    let matchUsers = utils_1.userDataDatabase.find((el) => el.email === email);
    if (matchUsers) {
        const checkPasswords = yield bcrypt.compare(password, matchUsers.password);
        if (checkPasswords) {
            const userToken = generateToken(matchUsers.id);
            res.cookie("Token", userToken);
            res.redirect("/books");
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "Email or Password Incorrect. Check Your Details and Try Again!",
            });
        }
    }
    else {
        // slow down incase we didnt get a valid email so response time is similar
        const salt = yield bcrypt.genSalt(10);
        const fakePassword = `$2a$${salt}$invalidusernameandpaaaaaaaaaaaaaaaaaaaa`;
        const comparePass = yield bcrypt.compare(fakePassword, password);
        res.status(401).json({
            status: "failed",
            message: "Email or Password Incorrect. Check Your Details and Try Again!",
        });
    }
});
exports.userLogin = userLogin;
const displayUsers = (req, res) => {
    res.status(200).json({
        status: "Successful",
        data: {
            userDataDatabase: utils_1.userDataDatabase,
        },
    });
};
exports.displayUsers = displayUsers;
