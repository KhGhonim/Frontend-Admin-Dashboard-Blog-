import bcrypt from "bcrypt";
import MongoDB from "../../Config/MongoDB.js";
import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const objfromFrontend = req.body;
    await MongoDB();
    const EmailExists = await UserModel.findOne({
      email: objfromFrontend.email,
    });

    if (EmailExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const NameExists = await UserModel.findOne({ name: objfromFrontend.name });

    if (NameExists) {
      return res.status(400).send({
        message: "Name already exists, Please choose a different name",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(objfromFrontend.password, salt);

    const user = await UserModel.create({
      name: objfromFrontend.name,
      email: objfromFrontend.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    if (user) {
      res.status(201).send({ message: "User created successfully" });
    } else {
      res.status(400).send({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const objfromFrontend = req.body;
    await MongoDB();
    const user = await UserModel.findOne({ email: objfromFrontend.email });

    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(
      objfromFrontend.password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

