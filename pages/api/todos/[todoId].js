import jwt from "jsonwebtoken";
import { connectDB } from "../../../db/config";
import Todo from "../../../db/models/todoModel";
import User from "../../../db/models/userModel";
connectDB();

export default async (req, res) => {
  const {
    headers: { authorization },
    query: { todoId },
    body: { todo },
    method,
  } = req;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const todoInDb = await Todo.findById(todoId);
      if (String(decoded.id) === String(todoInDb.user)) {
        switch (method) {
          case "GET":
            try {
              res.statusCode = 200;
              res.json({ todo: todoInDb });
            } catch (err) {
              res.statusCode = 404;
              res.json({
                error: `Could not find todo with id ${todoId}. ${err}`,
              });
            }
            break;
          case "PUT":
            let todoWithoutId = { ...todo };
            delete todoWithoutId._id;
            try {
              await Todo.findByIdAndUpdate(todoId, {
                ...todoWithoutId,
              });
              res.statusCode = 204;
              res.end();
            } catch (err) {
              res.statusCode = 409;
              res.json({
                error: `Could not update todo with id ${todoId}. ${err}`,
              });
            }
            break;
          case "DELETE":
            try {
              await Todo.findByIdAndDelete(todoId);
              res.statusCode = 204;
              res.end();
            } catch (err) {
              res.statusCode = 409;
              res.json({
                error: `Could not delete todo with id ${todoId}. ${err}`,
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
          error: `User is not allowed to access todo with id ${todoId}.`,
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
