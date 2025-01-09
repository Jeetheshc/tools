import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
export const userSignup = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

      
        const newUser = new User({ name, email, password: hashedPassword, phone, address});
        await newUser.save();

        const token = generateToken(newUser, "user");
        res.cookie("token", token, { sameSite: "None", secure: true });
        // res.cookie("token", token);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (!userExist.isActive) {
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }



        const token = generateToken(userExist, 'user');
        res.cookie("token", token, { sameSite: "None", secure: true });
        // res.cookie('token', token);

        res.json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const userLogout = (req, res) => {
    try {
        res.clearCookie('token', { secure: true, sameSite: 'none' });

        res.json({ message: "user logout success" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};