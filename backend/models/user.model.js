import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must be at least 3 characters long."],
      maxLength: [30, "Name must be at most 30 characters long."],
      match: /^[a-zA-Z ]+$/,
      validate: {
        validator: (v) => /^[a-zA-Z ]+$/.test(v),
        message: "{VALUE} is not a valid name.",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "Username must be at least 3 characters long."],
      maxLength: [30, "Username must be at most 30 characters long."],
      match: /^[a-zA-Z0-9]+$/,
      validate: {
        validator: (v) => /^[a-zA-Z0-9]+$/.test(v),
        message: "{VALUE} is not a valid username.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      validate: {
        validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: "{VALUE} is not a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 30,
      validate: {
        validator: (v) => v.length >= 6,
        message: "Password must be at least 6 characters long.",
      },
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/,
      validate: {
        validator: (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/.test(v),
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

// Compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
