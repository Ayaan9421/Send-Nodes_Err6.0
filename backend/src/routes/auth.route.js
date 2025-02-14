import express from "express";
import passport from "passport";
import { Strategy as TwitterOAuth2Strategy } from "passport-twitter-oauth2";
import dotenv from "dotenv";
import {
  checkAuth,
  login,
  logout,
  signup,
  twitterLogin,
  twitterCallback,
  twitterSuccess,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

// Routes
router.get("/twitter", twitterLogin);
router.get("/twitter/callback", twitterCallback, twitterSuccess);


router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;
