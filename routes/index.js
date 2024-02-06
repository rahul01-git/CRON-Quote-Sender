const express = require("express");
const router = express.Router();
const fs = require('fs')
const {encryptData, decryptData} = require('../helper/encrypt-decrypt')

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  let encEmail = encryptData(email, process.env.SECRET_KEY)
  let data;

  if (!fs.existsSync("subscribers.txt")) {
    fs.writeFileSync("subscribers.txt", `${encEmail}\n`, "utf-8");
  } else {
    data = fs.readFileSync("subscribers.txt", "utf-8");
    const existingEmails = data.split("\n").map((line) => line.trim());
    if (existingEmails.includes(encEmail)) {
      return res.render("message", {
        message: `${email} already exists.`,
        success: false,
      });
    }
  }
  fs.appendFileSync("subscribers.txt", `${encEmail}\n`);
  res.render("message", { message: "Thank you for using 😊", success: true });
});

module.exports = router;
