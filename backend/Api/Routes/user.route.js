import express from "express";
import JWTverifier from "../Helpers/JWTverifier.js";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/use.controller.js";

const router = express.Router();

router.put("/update/:userId", JWTverifier, updateUser);
router.delete("/delete/:userId", JWTverifier, deleteUser);
router.post("/signout", signout);
router.get("/getusers", JWTverifier, getUsers);
