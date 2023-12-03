import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    if (error instanceof Error) console.error(`Error: ${error.message}`);
    else console.error(error);
    process.exit(1);
  }
};

export default connectDB;
