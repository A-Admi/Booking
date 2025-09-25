import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";   // ⬅️ import your db connection

dotenv.config();

const app = express();

// connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, MongoDB + Express is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
