const Agenda = require("agenda");
require("dotenv").config();
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "jobs",
  },
});

agenda.define("send email", async (job) => {
  const { to, subject, body } = job.attrs.data;
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text: body,
  });
  console.log(`Email sent to ${to}`);
});

(async () => {
  await agenda.start();
})();

module.exports = agenda;
