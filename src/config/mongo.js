import mongoose from "mongoose";

async function connect() {
  try {
    // Choose MongoDB connection string based on environment
    let url;
    if (process.env.NODE_ENV === "production") {
      url = process.env.MONGO_URI; // for production
    } else {
      url = process.env.MONGO_URI || "mongodb://localhost:27017/FBR"; // fallback for dev
    }

    // Connect to MongoDB
    await mongoose.connect(url);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
}

export default connect;
