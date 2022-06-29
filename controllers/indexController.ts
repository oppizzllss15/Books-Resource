import { fstat, readFileSync, writeFile, writeFileSync } from "fs";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import {
  checkBooks,
  checkSpecificBook,
  booksDatabase,
} from "../models/bookModels";
import { type } from "os";
import { createFile, filepath, updateFile } from "../utils/utils";
const asyncHandler = require("express-async-handler");

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const data = await checkBooks();
  if (!data) {
    res.status(500).json({
      status: "Failed",
      message: "Database Has No Books!",
    });
  } else {
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
});

const getSpecificBook = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = checkSpecificBook(id);
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
});

// let newID = booksDatabase[booksDatabase.length - 1].bookId + 1;

const addBook = asyncHandler(async (req: Request, res: Response) => {
  try {
    let newID;
    let newBook: Ibook;
    if (booksDatabase.length < 1) {
      newID = 1;
      newBook = Object.assign(req.body, { bookId: newID });
    } else {
      newID = booksDatabase[booksDatabase.length - 1].bookId + 1;
      newBook = Object.assign(req.body, { bookId: newID });
    }
    createFile(newBook, filepath, booksDatabase);
    res.status(201).redirect("/books");
  } catch (err) {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't update file!",
      });
    }
  }
});

const updateSpecificBook = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = booksDatabase.find((b: Ibook) => b.bookId === id);
  console.log(id);
  // console.log(req.body);
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
  book["Title"] = Title || book.Title;
  book["Author"] = Author || book.Author;
  book["datePublished"] = datePublished || book.datePublished;
  book["Description"] = Description || book.Description;
  book["pageCount"] = pageCount || book.pageCount;
  book["Genre"] = Genre || book.Genre;
  book["bookId"] = bookId || book.bookId;
  book["Publisher"] = Publisher || book.Publisher;
  writeFile(
        `${__dirname}/../database.json`,
        JSON.stringify(booksDatabase),
        (err) => {
          if (err) {
            res.status(400).json({
              status: "failed",
              message: "Couldn't update file!",
            });
          } else {
            res.status(201).render("allbooks", { data: [book] });
          }
        }
      );

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
});

const deleteSpecificBook = asyncHandler(async (req: Request, res: Response) => {
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
      res.status(200);
      return res.render("allbooks", { data: booksDatabase });
    }
  );
});

export {
  getAllBooks,
  getSpecificBook,
  addBook,
  updateSpecificBook,
  deleteSpecificBook,
};
