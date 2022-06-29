"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksDatabase = exports.checkSpecificBook = exports.checkBooks = void 0;
const utils_1 = require("../utils/utils");
Object.defineProperty(exports, "booksDatabase", { enumerable: true, get: function () { return utils_1.booksDatabase; } });
const fs = require("fs");
const checkSpecificBook = (id) => {
    const book = utils_1.booksDatabase.find((item) => item.bookId === id);
    const check = `The book id: ${id}, you searched for doesn't exist`;
    if (utils_1.booksDatabase.length < 1) {
        return false;
    }
    if (id > utils_1.booksDatabase.length) {
        return check;
    }
    return book;
};
exports.checkSpecificBook = checkSpecificBook;
const checkBooks = () => {
    if (utils_1.booksDatabase.length < 1) {
        return false;
    }
    else {
        return utils_1.booksDatabase;
    }
};
exports.checkBooks = checkBooks;
// return new Promise((resolve, reject) => {
//   if (booksDatabase.length < 1) {
//     reject("false");
//   } else {
//     resolve(booksDatabase);
//   }
// }).catch(() => {
//   return false;
// });
