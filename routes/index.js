"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../controllers/indexController");
// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
router
    .route("/books")
    .get(indexController_1.getAllBooks)
    .post(indexController_1.addBook);
router
    .route("/books/:id")
    .get(indexController_1.getSpecificBook)
    .put(indexController_1.updateSpecificBook)
    .delete(indexController_1.deleteSpecificBook);
module.exports = router;
