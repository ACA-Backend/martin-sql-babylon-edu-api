import { Router } from "express";
import authMiddleware from "../app/middleware/auth.middleware.js";
import authorizationMiddleware from "../app/middleware/authorization.middleware.js";
import {
  borrowABook,
  createNewBook,
  deleteSingleBook,
  fetchAllBooks,
  fetchBook,
  returnABook,
  updateSingleBook,
} from "../app/controllers/book.controller.js";
const router = Router();

router.get("/", authMiddleware, fetchAllBooks);
router.post("/", authMiddleware, authorizationMiddleware, createNewBook);
router.get("/:id", authMiddleware, fetchBook);
router.put("/:id", authMiddleware, authorizationMiddleware, updateSingleBook);
router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  deleteSingleBook
);
router.post("/:id/borrow", authMiddleware, borrowABook);
router.put("/:id/return", authMiddleware, returnABook);

export const booksRouter = router;
