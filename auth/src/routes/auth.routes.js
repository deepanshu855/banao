import { Router } from "express";
import passport from "passport";
import userModel from "../models/user.model.js";
import { sendAuthNotification } from "../config/mq.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req, res) => {
    try {
      const { id, displayName, emails, photos } = req.user;
      let user = await userModel.findOne({ googleId: id });

      if (!user) {
        user = await userModel.create({
          googleId: id,
          email: emails[0].value,
          name: displayName,
          avatar: photos[0].value,
        });
      }

      await sendAuthNotification({
        userId: user._id,
        action: "google_login",
        timestamp: new Date(),
        email: emails[0].value,
      });

      // Generate a JWT for the authenticated user
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7h" },
      );

      res.cookie("token", token, { httpOnly: true });
      return res.redirect("http://localhost:5173/projects");
    } catch (error) {
      console.error("Error during Google authentication:", error);
      return res.redirect("/login?error=auth_failed");
    }
  },
);

authRouter.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
});

export default authRouter;
