import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo URI missing");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);

    isConnected = true;

    console.log("mongoDB connected");
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    console.error("MongoDB Connection Error:", errorMessage);

    throw createError({
      statusCode: 500,
      statusMessage: `Database Connection Failed: ${errorMessage}`,
      fatal: true,
    });
  }
};
 



