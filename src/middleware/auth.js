const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ success: false, message: "Auth Error" });
    }

    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ success: false, message: "Invalid Token" });
    }
};