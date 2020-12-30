import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schemaName = "User";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

// @ts-ignore
userSchema.pre("save", async function (next) {
  // @ts-ignore
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models[schemaName] ||
  mongoose.model(schemaName, userSchema);
