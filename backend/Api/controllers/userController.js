import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(res.status(403).json("You can update only your account!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        res.status(403).json("Password must be atleast 6 characters")
      );
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.name) {
    if (req.body.name.length < 7 || req.body.name.length > 20) {
      return next(
        res.status(400).json("name must be between 7 and 20 characters")
      );
    }
    if (req.body.name.includes(" ")) {
      return next(res.status(400).json("name cannot contain spaces"));
    }
    if (req.body.name !== req.body.name.toLowerCase()) {
      return next(res.status(400).json("name must be in lowercase"));
    }
    if (!req.body.name.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        res.status(400).json("name must only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUsers = async () => {};



export const deleteUser = (params) => {};
