import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db.js";

import planRouter from "./routes/plan.js";
import callRouter from "./routes/call.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plan", planRouter);
app.use("/api/call", callRouter);

try {
  const connection = await pool.getConnection();
  console.log("✅ MySQL Connected");
  connection.release();
} catch (err) {
  console.error("❌ Database Error");
  console.error(err);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});