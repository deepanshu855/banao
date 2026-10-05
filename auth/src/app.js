import "dotenv/config";
import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import passport from "passport";
import cookies from "cookie-parser";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(cookies());
app.use(passport.initialize());

app.get("/_status/healthz", (req, res) => {
  res.status(200).json({ status: "ok", message: "Auth health check" });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    },
  ),
);

import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

export default app;
