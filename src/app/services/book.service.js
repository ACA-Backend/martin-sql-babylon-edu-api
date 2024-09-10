import { BadRequestError, NotFoundError } from "../../lib/error-definitions.js";
import { aggregateResults, paginate } from "../../lib/util.js";
import { Book } from "../schema/book.schema.js";
import { BorrowedBook } from "../schema/borrowed-books.schema.js";
import appConfig from "../../config/app.config.js";
import { cache } from "../../bootstrap/server.js";

export const createBook = async (payload) => {
  return await Book.create(payload);
};

export const getBooks = async (payload) => {
  const { page, limit, ...rest } = payload;

  const query = { page, limit };

  // check if the cache is enabled, then check if the key esists in the cache
  if (appConfig.redis.state === "enabled") {
    const cachedResults = await cache.get("books");

    if (!cachedResults) {
      const books = await Book.find({ ...rest }).populate("authors");

      // cache the results
      await cache.set("books", books);

      return await paginate(books, query);
    }

    return await paginate(cachedResults, query);
  }

  const books = await Book.find({ ...rest }).populate("authors");

  return await paginate(books, query);
};

export const getBook = async (id) => {
  return await Book.findById(id).populate("authors");
};

export const updateBook = async (id, payload) => {
  return await Book.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

// export const borrowBook = async (id, userId, borrowedAt) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const book = await Book.findById(id).session(session);

//     if (!book)
//       throw new NotFoundError("This book does not exist in our database");

//     if (book.availableCopies < 1)
//       throw new BadRequestError("This book is currently unavailable");

//     book.availableCopies -= 1;
//     await book.save({ session });

//     await BorrowedBook.create([{ userId, bookId: id, borrowedAt }], {
//       session,
//     });

//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
// };

// export const returnBook = async (id, userId, returnedAt) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const borrowedBook = await BorrowedBook.findOne({
//       userId,
//       bookId: id,
//       returnedAt: null,
//     }).session(session);

//     if (!borrowedBook)
//       throw new NotFoundError("This book is not borrowed by you");

//     const book = await Book.findById(id).session(session);

//     book.availableCopies += 1;
//     await book.save({ session });

//     await borrowedBook.updateOne({ returnedAt }, { session });

//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
// };

export async function dropBooksCollection() {
  await Book.collection.drop();
}
