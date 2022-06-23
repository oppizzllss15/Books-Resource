interface Ibook {
  Title: String;
  Author: String;
  datePublished: String;
  Description: String;
  pageCount: Number;
  Genre: String;
  bookId: Number;
  Publisher: String;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Ipayload {
  id: string;
  exp: number;
}
