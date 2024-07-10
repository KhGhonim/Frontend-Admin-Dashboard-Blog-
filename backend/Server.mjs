import express from "express";
import MongoDB from "./Config/MongoDB";
import cors from "cors";

const app = express();
const port = 5000;

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes


// Connection
const startServer = async () => {
  await MongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
