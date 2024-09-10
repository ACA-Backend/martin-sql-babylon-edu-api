// import { model, Schema } from "mongoose";
// import { AuthorSchema } from "./author.schema.js";
// import mongoosePaginate from "mongoose-paginate-v2";

// const BookSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     genre: {
//       type: String,
//       required: true,
//     },
//     publisher: {
//       type: String,
//       required: true,
//     },
//     publicationDate: {
//       type: Date,
//       required: true,
//     },
//     authors: [AuthorSchema],
//     isbn: {
//       type: String,
//       required: true,
//     },
//     previewImage: {
//       type: String,
//       default: null,
//     },
//     availableCopies: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// BookSchema.plugin(mongoosePaginate);

// export const Book = model("Book", BookSchema);
