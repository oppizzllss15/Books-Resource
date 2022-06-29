"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;
const userDatabasePath = `${__dirname}/../userDatabase.json`;
if (!fs_1.default.existsSync(userDatabasePath)) {
    fs_1.default.writeFileSync(userDatabasePath, "[]");
}
const userDataDatabase = JSON.parse((0, fs_2.readFileSync)(userDatabasePath).toString());
const verifyJWT = (req, res, next) => {
    const token = req.cookies.Token;
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
// export { verifyJWT };
