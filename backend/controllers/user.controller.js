import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signupUser = async (req, res) => {
  try {
    const { username, name, password, email } = req.body;

    const user = await User.findOne({ username, email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username,
      name,
      password,
      email,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};
