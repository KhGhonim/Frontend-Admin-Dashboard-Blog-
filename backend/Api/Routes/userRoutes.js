import express from "express";
import JWTverifier from "../Helpers/JWTverifier.js";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/update/:userId", JWTverifier, updateUser);
router.delete("/delete/:userId", JWTverifier, deleteUser);
router.get("/getusers", JWTverifier, getUsers);

export default router;
