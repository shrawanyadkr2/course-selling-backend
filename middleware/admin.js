const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            msg: "Token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({
            msg: "You are not signed in"
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}