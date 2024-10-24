import mongoose from "mongoose";

let connection = {}; // Глобальный объект для хранения состояния подключения

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connection.readyState;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw new Error(error);
  }
};
