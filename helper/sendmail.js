const nodemailer = require("nodemailer");
require("dotenv").config();


const sendEmail = async (text, receiver) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: receiver,
      subject: "Quote for today",
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = sendEmail;
