import User from "../models/usermodel.js";

// Get User Address
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
