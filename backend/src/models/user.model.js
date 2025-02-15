import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
        type: String,
        enum: ["Student", "Landlord"],
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Baaki ko hum nahi lete"],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
    
  },
  { timestamps: true }
);



export const User = mongoose.model("User", userSchema);