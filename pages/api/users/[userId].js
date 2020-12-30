import jwt from "jsonwebtoken";
import { connectDB } from "../../../db/config";
import User from "../../../db/models/userModel";
connectDB();

export default async (req, res) => {
  const {
    headers: { authorization },
    query: { userId },
    body: { user },
    method,
  } = req;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (String(decoded.id) === String(userId)) {
        switch (method) {
          case "GET":
            try {
              const userInDb = await User.findById(userId);
              res.statusCode = 200;
              res.json({ user: userInDb });
            } catch (err) {
              res.statusCode = 404;
              res.json({
                error: `Could not find user with id ${userId}. ${err}`,
              });
            }
            break;
          case "PUT":
            let userWithoutId = { ...user };
            delete userWithoutId._id;
            try {
              await User.findByIdAndUpdate(userId, {
                ...userWithoutId,
              });
              res.statusCode = 204;
              res.end();
            } catch (err) {
              res.statusCode = 409;
              res.json({
                error: `Could not update user with id ${userId}. ${err}`,
              });
            }
            break;
          case "DELETE":
            try {
              await User.findByIdAndDelete(userId);
              res.statusCode = 204;
              res.end();
            } catch (err) {
              res.statusCode = 409;
              res.json({
                error: `Could not delete user with id ${userId}. ${err}`,
              });
            }
            break;
          default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).send(`Method ${method} Not Allowed`);
            break;
        }
      } else {
        res.statusCode = 401;
        res.json({
          error: `Token does not match requested user.`,
        });
      }
    } catch (err) {
      res.statusCode = 401;
      res.json({
        error: `Token failed, no corresponding user was found. ${err}.`,
      });
    }
  } else {
    res.statusCode = 401;
    res.json({
      error: `Invalid authorization, missing Bearer token.`,
    });
  }
};
