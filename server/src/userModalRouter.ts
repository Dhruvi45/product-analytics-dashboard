import { Router, Request, Response } from "express";
import { User } from "./userModal";
const { body, validationResult } = require("express-validator");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  [
    body("fullname").notEmpty().withMessage("Full Name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(() =>
        res.status(201).json({ message: "User registered successfully" })
      )
      .catch((err: any) => res.status(500).json({ error: err.message }));
  }
);

// Login route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      res.json({ token, message: "Login successful" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);
export default router;
