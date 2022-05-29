import mongoose from "mongoose";
import moongose from "mongoose";
import logger from "./logger";
const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/site-videos";

export async function connectToDatabase() {
  try {
    await moongose.connect(DB_CONNECTION_STRING);
    logger.info("Connect to dataBase");
  } catch (error) {
    logger.error(error, "Failed to connect to database. GoodBye");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info("Disconnected from database");

  return;
}
