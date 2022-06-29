"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../controllers/indexController");
const methodOverride = require("method-override");
// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    return res.render("index", { title: "Book store" });
});
router.get("/books/addbook", 
// verifyJWT,
function (req, res, next) {
    return res.render("addbook", { title: "Add New Book" });
});
router.get("/books/updatebook/:id", 
// verifyJWT,
function (req, res, next) {
    return res.render("updatebook", {
        title: "Update Book",
        id: Number(req.params.id),
    });
});
router.get("/books/deletebook/:id", function (req, res, next) {
    res.render("deletebook", { title: "Delete Book", id: req.params.id });
});
router.route("/books").get(indexController_1.getAllBooks).post(indexController_1.addBook);
router
    .route("/books/:id")
    .get(indexController_1.getSpecificBook)
    .put(indexController_1.updateSpecificBook)
    .delete(indexController_1.deleteSpecificBook);
module.exports = router;
