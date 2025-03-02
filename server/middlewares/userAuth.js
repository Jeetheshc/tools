import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token; // Check if token is in cookie
        if (!token) {
            return res.status(401).json({ message: "Unauthorized1" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized2" });
    }
};
