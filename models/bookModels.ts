import { fstat, readFileSync, writeFile } from "fs";
const fs = require("fs");
const filepath = `${__dirname}/../database.json`;

if (!fs.existsSync(filepath)) {
  fs.writeFileSync(filepath, "[]");
}

const booksDatabase = JSON.parse(
  readFileSync(`${__dirname}/../database.json`).toString()
);

const checkSpecificBook = (id: Number) => {
  const book = booksDatabase.find((b: Ibook) => b.bookId === id);
  return new Promise((reject, resolve) => {
    if (booksDatabase.length < 1) {
      reject(false);
    } else {
      resolve(book);
    }
  });
};

const checkBooks = () => {
  return new Promise((resolve, reject) => {
    if (booksDatabase.length < 1) {
      reject("false");
    } else {
      resolve(booksDatabase);
    }
  }).catch(() => {
    return false;
  })
   
};

export { checkBooks, checkSpecificBook };
