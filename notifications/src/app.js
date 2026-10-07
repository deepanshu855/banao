import express from "express";
import morgan from "morgan";
import channel from "./config/mq.js";
import { sendEmail } from "./services/mail.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Hello from notification" });
});

app.get("/_status/healthz", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Notification health checkup" });
});

channel.consume("auth_notification_queue", async (msg) => {
  if (msg !== null) {
    const messageContent = msg.content.toString();
    console.log(`Received message from queue: ${messageContent}`);

    try {
      const { userId, timestamp, email } = JSON.parse(messageContent);

      const subject = "New Login Notification";
      const text = `A new login was detected for your account at ${timestamp}. If this was not you, please secure your account immediately.`;
      const html = `<p>A new login was detected for your account at <strong>${timestamp}</strong>. If this was not you, please secure your account immediately.</p>`;

      await sendEmail(email, subject, text, html);
    } catch (err) {
      console.log(`Error processing message: ${err}`);
    }
  } else {
    console.log("Received null message");
  }
});

export default app;
