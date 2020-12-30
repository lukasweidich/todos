import { connectDB } from "../../../db/config";
import User from "../../../db/models/userModel";
connectDB();

export default async (req, res) => {
  const {
    method,
    body: { user },
  } = req;
  switch (method) {
    case "POST":
      try {
        const createdUser = await User.create({ ...user });
        res.statusCode = 201;
        res.json({ user: createdUser });
      } catch (err) {
        res.statusCode = 409;
        res.json({
          error: `Could not create user. ${err}`,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).send(`Method ${method} not allowed`);
      break;
  }
};
