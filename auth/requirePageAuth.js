import jwt from "jsonwebtoken";
import { connectDB } from "../db/config";
import User from "../db/models/userModel";
require("dotenv").config();
connectDB();

export const withAuthentication = (fn) => async (ctx) => {
  const { req, resolvedUrl } = ctx;
  const token = await getAuthFromRequestCookies(req);
  if (!token) {
    return {
      redirect: {
        destination: `/login?redirect=${resolvedUrl}`,
        statusCode: 302,
      },
    };
  }
  return fn({ token: 456 });
};

const getAuthFromRequestCookies = async (request) => {
  const {
    cookies: { token },
  } = request;
  if (token) {
    const sanitizedToken = removeQuotesFromTokenString(token);
    try {
      const decoded = jwt.verify(
        String(sanitizedToken),
        process.env.JWT_SECRET
      );
      const correspondingUserInDb = await User.findById(decoded.id);
      return correspondingUserInDb;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

const removeQuotesFromTokenString = (token) =>
  String(token).substr(1, token.length - 2);
