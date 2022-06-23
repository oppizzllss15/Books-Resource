import { Request, Response, NextFunction } from "express";
import {
  getAllBooks,
  addBook,
  getSpecificBook,
  updateSpecificBook,
  deleteSpecificBook,
} from "../controllers/indexController";

// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

router
  .route("/books")
  .get(getAllBooks)
  .post(addBook);

router
  .route("/books/:id")
  .get(getSpecificBook)
  .put(updateSpecificBook)
  .delete(deleteSpecificBook);

module.exports = router;
