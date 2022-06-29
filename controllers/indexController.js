"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificBook = exports.updateSpecificBook = exports.addBook = exports.getSpecificBook = exports.getAllBooks = void 0;
const fs_1 = require("fs");
const bookModels_1 = require("../models/bookModels");
const utils_1 = require("../utils/utils");
const asyncHandler = require("express-async-handler");
const getAllBooks = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, bookModels_1.checkBooks)();
    if (!data) {
        res.status(500).json({
            status: "Failed",
            message: "Database Has No Books!",
        });
    }
    else {
        res.status(200).render("allbooks", { data });
        // res.status(200).json({
        //   status: "Successful",
        //   message:
        //     booksDatabase.length > 1
        //       ? `${booksDatabase.length} books`
        //       : `${booksDatabase.length} book`,
        //   data,
        // });
    }
}));
exports.getAllBooks = getAllBooks;
const getSpecificBook = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const book = (0, bookModels_1.checkSpecificBook)(id);
    if (!book) {
        return res.status(500).json({
            status: "Failed",
            message: "Database Has No Books!",
        });
    }
    if (typeof book === "string") {
        return res.status(400).json({
            status: "Failed",
            message: `The book id: ${id}, you searched for doesn't exist`,
        });
    }
    if (book) {
        return res.status(200).json({
            status: "Successful",
            data: {
                book,
            },
        });
    }
}));
exports.getSpecificBook = getSpecificBook;
// let newID = booksDatabase[booksDatabase.length - 1].bookId + 1;
const addBook = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newID;
        let newBook;
        if (bookModels_1.booksDatabase.length < 1) {
            newID = 1;
            newBook = Object.assign(req.body, { bookId: newID });
        }
        else {
            newID = bookModels_1.booksDatabase[bookModels_1.booksDatabase.length - 1].bookId + 1;
            newBook = Object.assign(req.body, { bookId: newID });
        }
        (0, utils_1.createFile)(newBook, utils_1.filepath, bookModels_1.booksDatabase);
        res.status(201).redirect("/books");
    }
    catch (err) {
        if (err) {
            res.status(400).json({
                status: "failed",
                message: "Couldn't update file!",
            });
        }
    }
}));
exports.addBook = addBook;
const updateSpecificBook = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const book = bookModels_1.booksDatabase.find((b) => b.bookId === id);
    console.log(id);
    // console.log(req.body);
    const { Title, Author, datePublished, Description, pageCount, Genre, bookId, Publisher, } = req.body;
    book["Title"] = Title || book.Title;
    book["Author"] = Author || book.Author;
    book["datePublished"] = datePublished || book.datePublished;
    book["Description"] = Description || book.Description;
    book["pageCount"] = pageCount || book.pageCount;
    book["Genre"] = Genre || book.Genre;
    book["bookId"] = bookId || book.bookId;
    book["Publisher"] = Publisher || book.Publisher;
    (0, fs_1.writeFile)(`${__dirname}/../database.json`, JSON.stringify(bookModels_1.booksDatabase), (err) => {
        if (err) {
            res.status(400).json({
                status: "failed",
                message: "Couldn't update file!",
            });
        }
        else {
            res.status(201).render("allbooks", { data: [book] });
        }
    });
    // try 2
    // const id = Number(req.params.id);
    // const book = booksDatabase.find((b: Ibook) => b.bookId === id);
    // const {
    //   Title,
    //   Author,
    //   datePublished,
    //   Description,
    //   pageCount,
    //   Genre,
    //   bookId,
    //   Publisher,
    // } = req.body;
    // (book.Title = Title || book.Title),
    //   (book.Author = Author || book.Author),
    //   (book.datePublished = datePublished || book.datePublished),
    //   (book.Description = Description || book.Description),
    //   (book.pageCount = pageCount || book.pageCount),
    //   (book.Genre = Genre || book.Genre),
    //   (book.bookId = bookId || book.bookId),
    //   (book.Publisher = Publisher || book.Publisher),
    //   writeFile(
    //     `${__dirname}/../database.json`,
    //     JSON.stringify(booksDatabase),
    //     (err) => {
    //       if (err) {
    //         res.status(400).json({
    //           status: "failed",
    //           message: "Couldn't update file!",
    //         });
    //       } else {
    //         res.status(201).render("books", { data: [book] });
    //       }
    //     }
    //   );
}));
exports.updateSpecificBook = updateSpecificBook;
const deleteSpecificBook = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const index = bookModels_1.booksDatabase.findIndex((ind) => ind.bookId === id);
    bookModels_1.booksDatabase.splice(index, 1);
    (0, fs_1.writeFile)(`${__dirname}/../database.json`, JSON.stringify(bookModels_1.booksDatabase), (err) => {
        if (err) {
            res.status(400).json({
                status: "Failed",
                message: "Couldnt write file.",
            });
        }
        res.status(200);
        return res.render("allbooks", { data: bookModels_1.booksDatabase });
    });
}));
exports.deleteSpecificBook = deleteSpecificBook;
