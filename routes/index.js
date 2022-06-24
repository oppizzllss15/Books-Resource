"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../controllers/indexController");
const authentication_1 = require("../middleware/authentication");
// const validator = require('express-joi-validator')
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Book store" });
});
router.route("/books").get(indexController_1.getAllBooks).post(authentication_1.verifyJWT, indexController_1.addBook);
router
    .route("/books/:id")
    .get(authentication_1.verifyJWT, indexController_1.getSpecificBook)
    .put(indexController_1.updateSpecificBook)
    .delete(indexController_1.deleteSpecificBook);
module.exports = router;
