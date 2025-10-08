const { body, validationResult } = require("express-validator");

const signupValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: errors.array()[0].msg, success: false });
    }
    next();
  },
];

const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: errors.array()[0].msg, success: false });
    }
    next();
  },
];

module.exports = { signupValidation, loginValidation };
