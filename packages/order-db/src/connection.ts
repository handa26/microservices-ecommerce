import mongoose from "mongoose";

let isDBConnected = false;

export const connectOrderDB = async () => {
  if (isDBConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in env file.");
  }

	try {
		await mongoose.connect(process.env.MONGO_URL as string);

    isDBConnected = true;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
