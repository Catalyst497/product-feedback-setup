import mongoose from "mongoose";

export async function connect() {
  try {
    const connection = await mongoose.connect(
      process.env.NEXT_PUBLIC_MONGO_URI
    );
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
