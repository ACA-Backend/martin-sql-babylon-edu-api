import { generateBooksWithAuthors } from "./util.js";

const seeder = {
  "super admins": [
    {
      email: "joedoe@gmail.com",
      password: "admin123",
      role: "super admin",
      username: "joedoe",
    },
    {
      email: "janedoe@gmail.com",
      password: "admin123",
      role: "super admin",
      username: "janedoe",
    },
  ],
  booksWithAuthors: generateBooksWithAuthors(),
};

export default seeder;