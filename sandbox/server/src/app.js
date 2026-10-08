import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api/sandbox/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Sandboxserver is healthy (Updated)" });
});

app.get("/", (req, res) => {
  res.send("Hello from the sandbox server!");
});

import authRouter from "./routes/sandbox.routes.js";
app.use("/api/sandbox", authRouter);

export default app;
