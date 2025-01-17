import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
