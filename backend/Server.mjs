import express from "express";
import cors from "cors";
import authRoutes from "./Api/Routes/authRoutes.js";
import userRoutes from "./Api/Routes/userRoutes.js";
import MongoDB from "./Config/MongoDB.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 5000;

// Middleware Connections
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// Connection
const startServer = async () => {
  await MongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
