import Auth from "../schema/auth_schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { uploadFileToImage } from "../../services/storage.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      gender,
      phone,
      address,
      title,
      discription,
    } = req.body;

    const image = req.file;
    console.log("image", image);

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, email, and password are required" });
    }

    const existingUser = await Auth.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // FIX: Only upload if an image was actually provided in the request
    let imageUrl = "";
    if (image) {
      const uploadFile = await uploadFileToImage(
        image.buffer,
        image.originalname,
      );
      console.log("uploadFile", uploadFile);
      imageUrl = uploadFile.url;
    }

    const newUser = new Auth({
      phone,
      name,
      username,
      email,
      gender,
      password: hashedPassword,
      address,
      title,
      discription,
      image: imageUrl.url,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/Username and password are required" });
    }

    const user = await Auth.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
