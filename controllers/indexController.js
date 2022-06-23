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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificBook = exports.updateSpecificBook = exports.addBook = exports.getSpecificBook = exports.getAllBooks = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const bookModels_1 = require("../models/bookModels");
const asyncHandler = require("express-async-handler");
const filepath = `${__dirname}/../database.json`;
if (!fs_1.default.existsSync(filepath)) {
    fs_1.default.writeFileSync(filepath, "[]");
}
const booksDatabase = JSON.parse((0, fs_2.readFileSync)(filepath).toString());
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, bookModels_1.checkBooks)();
    if (!data) {
        res.status(500).json({
            status: "Failed",
            message: "Database Has No Books!",
        });
    }
    else {
        res.status(200).json({
            status: "Successful",
            result: booksDatabase.length > 1
                ? `${booksDatabase.length} books`
                : `${booksDatabase.length} book`,
            data: {
                data,
            },
        });
    }
});
exports.getAllBooks = getAllBooks;
const getSpecificBook = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const book = booksDatabase.find((b) => b.bookId === id);
    if (booksDatabase.length < 1) {
        res.status(500).json({
            status: "Failed",
            message: "Database Has No Books!",
        });
    }
    else {
        res.status(200).json({
            status: "Successful",
            data: {
                book,
            },
        });
    }
}));
exports.getSpecificBook = getSpecificBook;
// let newID = booksDatabase[booksDatabase.length - 1].bookId + 1;
const addBook = (req, res) => {
    let newID;
    let newBook;
    if (booksDatabase.length < 1) {
        newID = 1;
        newBook = Object.assign(req.body, { bookId: newID });
    }
    else {
        newID = booksDatabase[booksDatabase.length - 1].bookId + 1;
        newBook = Object.assign(req.body, { bookId: newID });
    }
    booksDatabase.push(newBook);
    (0, fs_2.writeFile)(`${__dirname}/../database.json`, JSON.stringify(booksDatabase), (err) => {
        if (err) {
            res.status(400).json({
                status: "failed",
                message: "Couldn't update file!",
            });
        }
        res.status(201).json({
            status: "successful",
            data: newBook,
        });
    });
};
exports.addBook = addBook;
const updateSpecificBook = (req, res) => {
    const id = Number(req.params.id);
    const book = booksDatabase.find((b) => b.bookId === id);
    const { Title, Author, datePublished, Description, pageCount, Genre, bookId, Publisher, } = req.body;
    (book.Title = Title),
        (book.Author = Author),
        (book.datePublished = datePublished),
        (book.Description = Description),
        (book.pageCount = pageCount),
        (book.Genre = Genre),
        (book.bookId = bookId),
        (book.Publisher = Publisher),
        (0, fs_2.writeFile)(`${__dirname}/../database.json`, JSON.stringify(booksDatabase), (err) => {
            if (err) {
                res.status(400).json({
                    status: "failed",
                    message: "Couldn't update file!",
                });
            }
            res.status(201).json({
                status: "Successful",
                data: {
                    book: book,
                },
            });
        });
};
exports.updateSpecificBook = updateSpecificBook;
const deleteSpecificBook = (req, res) => {
    const id = Number(req.params.id);
    const index = booksDatabase.findIndex((ind) => ind.bookId === id);
    booksDatabase.splice(index, 1);
    (0, fs_2.writeFile)(`${__dirname}/../database.json`, JSON.stringify(booksDatabase), (err) => {
        if (err) {
            res.status(400).json({
                status: "Failed",
                message: "Couldnt write file.",
            });
        }
        res.status(200).json({
            status: "Successful",
            data: null,
        });
    });
};
exports.deleteSpecificBook = deleteSpecificBook;
