"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const fs_1 = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;
const userDatabasePath = `${__dirname}/../userDatabase.json`;
const userDataDatabase = JSON.parse((0, fs_1.readFileSync)(userDatabasePath).toString());
const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            if (jwt_key) {
                let validUser = jwt.verify(token, jwt_key);
                if (validUser) {
                    let validUserData = userDataDatabase.find((validUser) => {
                        validUser.id;
                    });
                }
                next();
            }
        }
        catch (error) {
            res.status(401).json({
                Message: "Not authorized!",
            });
        }
    }
    if (!token) {
        res.status(401);
        res.redirect("/users/login");
    }
};
exports.verifyJWT = verifyJWT;
