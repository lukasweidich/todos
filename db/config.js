import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  switch (mongoose.connection.readyState) {
    case 0:
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
        });
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      break;
    case 1:
      // do nothing
      break;
    default:
      break;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
