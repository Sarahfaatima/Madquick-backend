const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const userModal = new UserModal({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await userModal.save();
    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const user = await UserModal.findOne({ email });
    const errorMsg = "Authentication failed! Email or password is incorrect";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(  
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successfully", success: true, jwtToken, email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};
module.exports = { signup, login };
