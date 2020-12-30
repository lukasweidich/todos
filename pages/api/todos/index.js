import jwt from "jsonwebtoken";
import { connectDB } from "../../../db/config";
import Todo from "../../../db/models/todoModel";
import User from "../../../db/models/userModel";
connectDB();

export default async (req, res) => {
  const {
    headers: { authorization },
    body: { todo },
    method,
  } = req;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      switch (method) {
        case "GET":
          try {
            const todosOfUser = await Todo.find({ user });
            res.statusCode = 201;
            res.json({ todos: todosOfUser });
          } catch (err) {
            res.statusCode = 409;
            res.json({
              error: `Could not find todos for user. ${err}`,
            });
          }
          break;
        case "POST":
          try {
            const createdTodo = await Todo.create({ ...todo, user });
            res.statusCode = 201;
            res.json({ todo: createdTodo });
          } catch (err) {
            res.statusCode = 409;
            res.json({
              error: `Could not create todo. ${err}`,
            });
          }
          break;
        default:
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).send(`Method ${method} not allowed`);
          break;
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
