import fs from "fs";
import { fstat, readFileSync, writeFile } from "fs";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { checkBooks, checkSpecificBook } from "../models/bookModels";
const asyncHandler = require("express-async-handler");

const filepath = `${__dirname}/../database.json`;

if (!fs.existsSync(filepath)) {
  fs.writeFileSync(filepath, "[]");
}

const booksDatabase = JSON.parse(readFileSync(filepath).toString());

const getAllBooks = async (req: Request, res: Response) => {
  const data = await checkBooks();

  if (!data) {
    res.status(500).json({
      status: "Failed",
      message: "Database Has No Books!",
    });
  } else {
    res.status(200).json({
      status: "Successful",
      result:
        booksDatabase.length > 1
          ? `${booksDatabase.length} books`
          : `${booksDatabase.length} book`,
      data: {
        data,
      },
    });
  }
};

const getSpecificBook = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = booksDatabase.find((b: Ibook) => b.bookId === id);
  if (booksDatabase.length < 1) {
    res.status(500).json({
      status: "Failed",
      message: "Database Has No Books!",
    });
  } else {
    res.status(200).json({
      status: "Successful",
      data: {
        book,
      },
    });
  }
});

// let newID = booksDatabase[booksDatabase.length - 1].bookId + 1;

const addBook = (req: Request, res: Response) => {
  let newID;
  let newBook: Ibook;
  if (booksDatabase.length < 1) {
    newID = 1;
    newBook = Object.assign(req.body, { bookId: newID });
  } else {
    newID = booksDatabase[booksDatabase.length - 1].bookId + 1;
    newBook = Object.assign(req.body, { bookId: newID });
  }
  booksDatabase.push(newBook);
  writeFile(
    `${__dirname}/../database.json`,
    JSON.stringify(booksDatabase),
    (err) => {
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
    }
  );
};

const updateSpecificBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = booksDatabase.find((b: Ibook) => b.bookId === id);
  const {
    Title,
    Author,
    datePublished,
    Description,
    pageCount,
    Genre,
    bookId,
    Publisher,
  } = req.body;
  (book.Title = Title),
    (book.Author = Author),
    (book.datePublished = datePublished),
    (book.Description = Description),
    (book.pageCount = pageCount),
    (book.Genre = Genre),
    (book.bookId = bookId),
    (book.Publisher = Publisher),
    writeFile(
      `${__dirname}/../database.json`,
      JSON.stringify(booksDatabase),
      (err) => {
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
      }
    );
};

const deleteSpecificBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = booksDatabase.findIndex((ind: Ibook) => ind.bookId === id);
  booksDatabase.splice(index, 1);
  writeFile(
    `${__dirname}/../database.json`,
    JSON.stringify(booksDatabase),
    (err) => {
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
    }
  );
};

export {
  getAllBooks,
  getSpecificBook,
  addBook,
  updateSpecificBook,
  deleteSpecificBook,
};
