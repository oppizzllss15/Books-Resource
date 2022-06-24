import { Request, Response, NextFunction } from "express";
import {
  getAllBooks,
  addBook,
  getSpecificBook,
  updateSpecificBook,
  deleteSpecificBook,
} from "../controllers/indexController";
import { verifyJWT } from "../middleware/authentication";

// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Book store" });
});

router.route("/books").get(getAllBooks).post(verifyJWT, addBook);

router
  .route("/books/:id")
  .get(verifyJWT, getSpecificBook)
  .put(updateSpecificBook)
  .delete(deleteSpecificBook);

module.exports = router;
