import express from "express";
import { AllPosts, createPost, deletePost } from "../controllers/postController.js";
import JWTverifier from "../Helpers/JWTverifier.js";

const router = express.Router();

router.post("/create", JWTverifier, createPost);
router.get("/allposts", JWTverifier, AllPosts);
router.delete("/deletepost/:id", JWTverifier, deletePost);

export default router;
