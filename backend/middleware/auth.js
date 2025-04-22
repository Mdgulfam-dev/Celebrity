import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // Debugging

        if (typeof decoded.id === "object" && decoded.id.id) {
            req.user = { id: decoded.id.id.toString(), role: decoded.id.role };
        } else {
            req.user = { id: decoded.id.toString(), role: decoded.role };
        }

        console.log("Extracted User ID:", req.user.id); // Debugging
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
