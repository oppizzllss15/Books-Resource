import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { readFileSync, writeFile } from "fs";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;

const userDatabasePath = `${__dirname}/../userDatabase.json`;

if (!fs.existsSync(userDatabasePath)) {
  fs.writeFileSync(userDatabasePath, "[]");
}

const userDataDatabase = JSON.parse(readFileSync(userDatabasePath).toString());

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.Token;

  if (token) {
    try {
      if (jwt_key) {
        let validUser = jwt.verify(token, jwt_key);
        if (validUser) {
          let validUserData = userDataDatabase.find((validUser: IUser) => {
            validUser.id;
          });
        }
        next();
      }
    } catch (error) {
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

// export { verifyJWT };
