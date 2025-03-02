import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
export const userSignup = async (req, res) => {
    try {
        const { name, email, password, phone, address, designation } = req.body;

        if (!name || !email || !password || !phone || !address || !designation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

      
        const newUser = new User({ name, email, password: hashedPassword, phone, address,designation});
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
        console.log(email, password);
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
console.log(email, password);
        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Check if account is active
        if (!userExist.isActive) {
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        // Validate password
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate token and set cookie
        const token = generateToken(userExist, "user");
        res.cookie("token", token, { sameSite: "None", secure: true });

        // Send success response
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
export const checkUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User authorized", user });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getUserAddress = async (req, res) => {
    try {
        // Get user ID from token (assuming you are using userAuth middleware)
        const userId = req.user.id;

        // Find user by ID and get the address
        const user = await User.findById(userId).select("address");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ address: user.address });
    } catch (error) {
        console.error("Error fetching user address:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        // Get user ID from token (assuming userAuth middleware sets req.user)
        const userId = req.user.id;

        // Find user by ID and select specific fields
        const user = await User.findById(userId).select('name address designation phone email');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the selected fields
        res.status(200).json({
            name: user.name,
            address: user.address,
            designation: user.designation,
            phone: user.phone,
            email: user.email
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Update user profile details
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From userAuth middleware
        const { name, address, designation, phone, email } = req.body;

        // Validate required fields (adjust as needed)
        if (!name || !address || !designation || !phone || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, address, designation, phone, email },
            { new: true, runValidators: true } // Return updated doc, validate fields
        ).select('name address designation phone email');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            name: updatedUser.name,
            address: updatedUser.address,
            designation: updatedUser.designation,
            phone: updatedUser.phone,
            email: updatedUser.email
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
};