import { connectToDatabase } from "../config/db.config.js";
import { createUser, getUserByRole } from "../app/services/user.service.js";
import seeder from "../lib/seeder.js";
import { createBook } from "../app/services/book.service.js";

(async () => {
  // initialize database connection
  connectToDatabase();

  // check if the database has the same values we want to seed
  // if the values exist, do not seed the database
  if (seeder["super admins"].length !== 0) {
    const users = await getUserByRole("super admin");
    if (users.length !== 0) {
      console.info( "Database already seeded" );
    }

  //   // seed the database
    if(users.length === 0) {
      for (const superAdmin of seeder["super admins"]) {
        await createUser(superAdmin);
      }
      console.log("Super admins seeded successfully");
    }
  }

  if (seeder["booksWithAuthors"].length !== 0) {
    for (const book of seeder["booksWithAuthors"]) {
      const { authors, ...bookData } = book;

      const bookRecord = await createBook( bookData );

      authors.forEach(async (author) => {
        bookRecord.authors.push(author);
      });
      await bookRecord.save();
    }

    console.log("Books seeded successfully");
    process.exit(0);
  }
})();
