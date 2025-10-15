import express from "express";
import dotenv from "dotenv"
import {  connectMongo } from "./config/index.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
dotenv.config();
routes(app)

async function startServer() {
  try {
    // Connect to both databases
    await connectMongo();
    

    // Start Express server
    app.listen(5000, () => {
      console.log("✅ Server is running successfully on port 5000");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
  }
}

startServer();
