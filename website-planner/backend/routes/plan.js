import express from "express";
import pool from "../db.js";
import transporter from "../mailer.js";

import adminPlan from "../templates/adminPlan.js";
import customerPlan from "../templates/customerPlan.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    await pool.execute(
      `
      INSERT INTO project_requests
      (
        name,
        email,
        phone,
        business,
        websiteType,
        pages,
        budget,
        features,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.name,
        data.email,
        data.phone,
        data.business,
        data.websiteType,
        data.pages,
        data.budget,
        JSON.stringify(data.features),
        data.description,
      ]
    );

    await transporter.sendMail({
      from: `"WebCraft Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🚀 New Website Project Request",
      html: adminPlan(data),
    });

    await transporter.sendMail({
      from: `"WebCraft Studio" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "We've Received Your Website Project Request",
      html: customerPlan(data),
    });

    res.status(200).json({
      success: true,
      message:
        "Project request submitted successfully! Check your email for confirmation.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save project or send email.",
    });
  }
});

export default router;