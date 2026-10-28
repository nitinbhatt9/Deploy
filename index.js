import express from "express";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/auth_routes.js";
import profileRoutes from "./src/routes/profile_routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server Initiated On This Port http://localhost:${PORT}`);
});
