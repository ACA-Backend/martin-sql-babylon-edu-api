import { ConflictError } from "../../lib/error-definitions.js";
import { User } from "../schema/user.schema.js";

export const createUser = async (payload) => {
  // check if a record already exists with the user details
  const user = await User.findOne({
    $or: [{ email: payload.email }, { username: payload.username }],
  });

  // if the user exists, throw an error that the user record exists
  if (user)
    throw new ConflictError("A user with the provided details already exists");

  // create a new user record
  return await User.create(payload);
};

export const getUser = async (id) => {
  return await User.findById(id);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserByRole = async (role) => {
  return await User.find({ role });
};

export const deleteUsers = async (role) => {
  await User.deleteMany(role);
};
