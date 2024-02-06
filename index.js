const express = require("express");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");
const sendEmail = require("./helper/sendmail");
const { fetchQuote } = require("./helper/fetchQuote");
const routes = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

cron.schedule(
  "30 09 * * *",
  async () => {
    const data = await fetchQuote();
    let fileData = fs.readFileSync("subscribers.txt", "utf-8");
    const emails = fileData.split("\n").map((line) => line.trim());
    sendEmail(data, emails);
  },
  {
    timezone: process.env.TIMEZONE,
  }
);

app.listen(
  process.env.PORT,
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
