import express from "express";
import cors from "cors";
import authRoutes from "./Api/Routes/authRoutes.js";
import MongoDB from "./Config/MongoDB.js";


const app = express();
const port = 5000;

// Middleware Connections
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/login", authRoutes);

// Connection
const startServer = async () => {
  await MongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
