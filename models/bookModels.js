"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpecificBook = exports.checkBooks = void 0;
const fs_1 = require("fs");
const fs = require("fs");
const filepath = `${__dirname}/../database.json`;
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, "[]");
}
const booksDatabase = JSON.parse((0, fs_1.readFileSync)(`${__dirname}/../database.json`).toString());
const checkSpecificBook = (id) => {
    const book = booksDatabase.find((b) => b.bookId === id);
    return new Promise((reject, resolve) => {
        if (booksDatabase.length < 1) {
            reject(false);
        }
        else {
            resolve(book);
        }
    });
};
exports.checkSpecificBook = checkSpecificBook;
const checkBooks = () => {
    return new Promise((resolve, reject) => {
        if (booksDatabase.length < 1) {
            reject("false");
        }
        else {
            resolve(booksDatabase);
        }
    }).catch(() => {
        return false;
    });
};
exports.checkBooks = checkBooks;
