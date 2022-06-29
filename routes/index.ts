import { Request, Response, NextFunction } from "express";
import {
  getAllBooks,
  addBook,
  getSpecificBook,
  updateSpecificBook,
  deleteSpecificBook,
} from "../controllers/indexController";
import { verifyJWT } from "../middleware/authentication";
const methodOverride = require("method-override");

// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  return res.render("index", { title: "Book store" });
});

router.get(
  "/books/addbook",
  // verifyJWT,
  function (req: Request, res: Response, next: NextFunction) {
    return res.render("addbook", { title: "Add New Book" });
  }
);

router.get(
  "/books/updatebook/:id",
  // verifyJWT,
  function (req: Request, res: Response, next: NextFunction) {
    return res.render("updatebook", {
      title: "Update Book",
      id: Number(req.params.id),
    });
  }
);

router.get(
  "/books/deletebook/:id",
  function (req: Request, res: Response, next: NextFunction) {
    res.render("deletebook", { title: "Delete Book", id: req.params.id });
  }
);

router.route("/books").get(getAllBooks).post(addBook);

router
  .route("/books/:id")
  .get(getSpecificBook)
  .put(updateSpecificBook)
  .delete(deleteSpecificBook);

module.exports = router;
