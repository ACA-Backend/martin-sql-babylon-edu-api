import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { NotFoundError } from "../lib/error-definitions.js";
import errorMiddleware from "../app/middleware/error.middleware.js";
import { authRouter } from "../routes/api.js";
import cookieParser from "cookie-parser";
import config from "../config/app.config.js";
import { getSecondsFromNow } from "../lib/util.js";
import { booksRouter } from "../routes/books.js";
import CacheProvider from "../app/providers/cache.provider.js";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieParser({
    httpOnly: true,
    secure: config.environment === "production",
    sameSite: "strict",
    maxAge: getSecondsFromNow(config.jwt.expiration),
  })
);

app.get("/health", (req, res) => {
  return res.json({
    success: true,
    message: "The server is up and running",
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", booksRouter);
app.use("*", (req, res) => {
  throw new NotFoundError(
    `The requested route ${req.originalUrl} does not exist on this server`
  );
});

app.use(errorMiddleware);

// instantiate the cache and export it
const cache = new CacheProvider();

export { app, cache, server };
