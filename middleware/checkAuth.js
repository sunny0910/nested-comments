const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['token'];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message : "Auth Failed",
            error: error,
        });
    }
}