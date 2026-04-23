import mongoose from "mongoose";

let isDbConnected = false;

export const connectDB = async () => {
  if (isDbConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("DB connection is not defined.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isDbConnected = true;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
