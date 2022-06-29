import { booksDatabase } from "../utils/utils";
const fs = require("fs");

const checkSpecificBook = (id: Number) => {
  const book: Ibook = booksDatabase.find((item: Ibook) =>
    item.bookId === id
  );
  const check = `The book id: ${id}, you searched for doesn't exist`;
  if (booksDatabase.length < 1) {
    return false;
  }
  if (id > booksDatabase.length) {
    return check;
  }
  return book;
};

const checkBooks = () => {
  if (booksDatabase.length < 1) {
    return false;
  } else {
    return booksDatabase;
  }
};

export { checkBooks, checkSpecificBook, booksDatabase };

// return new Promise((resolve, reject) => {
//   if (booksDatabase.length < 1) {
//     reject("false");
//   } else {
//     resolve(booksDatabase);
//   }
// }).catch(() => {
//   return false;
// });
