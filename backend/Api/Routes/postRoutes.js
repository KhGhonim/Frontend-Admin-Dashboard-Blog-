import express from "express";
import { createPost } from "../controllers/postController.js";
import JWTverifier from "../Helpers/JWTverifier.js";

const router = express.Router();

router.post("/create", JWTverifier, createPost);

export default router;
