import nodemailer from "nodemailer";
import { generateForgotEmailTemplate } from "./templates/email.js";

export const sendForgotPassEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `FBR Invoice  <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",

    html: generateForgotEmailTemplate(resetToken),
  };

  return transporter.sendMail(mailOptions);
};