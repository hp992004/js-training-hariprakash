import express from "express";
import pool from "../db.js";
import transporter from "../mailer.js";

import adminCall from "../templates/adminCall.js";
import customerCall from "../templates/customerCall.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    await pool.execute(
      `
      INSERT INTO discovery_calls
      (
        name,
        company,
        email,
        phone,
        date,
        timeSlot
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        data.name,
        data.company,
        data.email,
        data.phone,
        data.date,
        data.timeSlot,
      ]
    );

    await transporter.sendMail({
      from: `"WebCraft Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📅 New Discovery Call Booking",
      html: adminCall(data),
    });

    await transporter.sendMail({
      from: `"WebCraft Studio" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Your Discovery Call Has Been Confirmed",
      html: customerCall(data),
    });

    res.status(200).json({
      success: true,
      message:
        "Your discovery call has been booked! Please check your email.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save booking or send email.",
      error: error.message,
    });
  }
});

export default router;