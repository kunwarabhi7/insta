import User from "../models/user.model.js";

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
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};
