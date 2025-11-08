import User from "../models/User.model.js"; 
import bcrypt from "bcryptjs";
import generateToken from "../utils/generatetoken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully ",
      userId: newUser._id
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful ",
      token,
      userId: user._id
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
