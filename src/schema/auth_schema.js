import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      // default: "",
      enum: ["Male", "Female", "Others"],
    },
    phone: {
      type: Number,
      required: [true, "Number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    discription: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Auth = model("auth", authSchema);

export default Auth;
