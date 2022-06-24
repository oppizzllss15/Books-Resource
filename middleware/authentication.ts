import express, { Request, Response, NextFunction } from "express";
import { readFileSync, writeFile } from "fs";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;

const userDatabasePath = `${__dirname}/../userDatabase.json`;

const userDataDatabase = JSON.parse(readFileSync(userDatabasePath).toString());

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

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

export { verifyJWT };
