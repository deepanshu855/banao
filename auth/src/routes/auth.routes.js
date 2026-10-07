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
        { id: req.user.id, displayName: req.user.displayName },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
      // Send the token to the client
      res.json({ token });
    } catch (error) {
      console.error("Error during Google authentication:", error);
      res.redirect("/");
    }
  },
);

export default authRouter;
