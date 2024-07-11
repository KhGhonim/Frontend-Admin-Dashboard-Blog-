import mongoose from "mongoose";
const { Schema, models } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// Create a model based on that schema, and change the name of the model to match your liking.
const UserModel = models.User || mongoose.model("User", UserSchema);

export default UserModel;
