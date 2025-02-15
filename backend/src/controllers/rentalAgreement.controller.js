import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createAgreement, getAgreements } from "./rentalAgreement.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAgreements);
router.post("/", verifyToken, createAgreement);

export default router;
