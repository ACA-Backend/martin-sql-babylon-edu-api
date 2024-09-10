import {
  NotFoundError,
  UnauthenticatedError,
} from "../../lib/error-definitions.js";
import argon from "argon2";
import * as userService from "./user.service.js";
import { generateAuthenticationToken } from "../providers/jwt.provider.js";
import config from "../../config/app.config.js";
import { getSecondsFromNow } from "../../lib/util.js";

export const registerUser = async (payload) => {
  await userService.createUser(payload);
};

export const authenticateUser = async (payload) => {
  const user = await userService.getUserByEmail(payload.email);

  if (!user)
    throw new NotFoundError(
      "We could not validate your credentials, please try again"
    );

  if (!(await argon.verify(user.password, payload.password)))
    throw new UnauthenticatedError(
      "We could not validate your credentials, please try again"
    );

  // create the token and set it in the cookie
  return generateAuthenticationToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};
