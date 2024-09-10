import Joi from "joi";

export const CreateBookRequest = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  publisher: Joi.string().required(),
  publicationDate: Joi.date().required(),
  authors: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      bio: Joi.string().required(),
      website: Joi.string().required(),
    })
  ),
  isbn: Joi.string().required(),
  previewImage: Joi.string().optional(),
});
