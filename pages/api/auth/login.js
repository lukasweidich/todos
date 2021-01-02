import generateToken from "../../../auth/generateToken";
import { connectDB } from "../../../db/config";
import User from "../../../db/models/userModel";
connectDB();

export default async (req, res) => {
  const {
    body: { email, password },
    method,
  } = req;
  switch (req.method) {
    case "POST":
      try {
        if (email && password) {
          const user = await User.findOne({ email });
          if (user && (await user.matchPassword(password))) {
            const { _id, firstName, lastName, email } = user;
            res.statusCode = 200;
            res.json({
              user: { firstName, lastName, email, id: _id },
              token: generateToken(_id),
            });
          } else {
            res.statusCode = 401;
            res.json({
              error: `Invalid email or password.`,
            });
          }
        } else {
          res.statusCode = 401;
          res.json({
            error: `Request was either missing email or password.`,
          });
        }
      } catch (err) {
        res.statusCode = 401;
        res.json({
          error: err,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).send(`Method ${method} Not Allowed`);
      break;
  }
};
