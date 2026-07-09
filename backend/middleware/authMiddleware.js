const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    // Remove "Bearer " from the token
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (err) {

        return res.status(400).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;