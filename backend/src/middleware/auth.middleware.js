const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.myToken;

        if (!token) {
            return res.status(401).json({   // ← return + 401 status
                "message": "Token is not available. Please login."
            });
        }

        const isTokenBlacklist = await blacklistTokenModel.findOne({ token });

        if (isTokenBlacklist) {
            return res.status(401).json({   // ← return
                "message": "Token is blacklisted. Please login again."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({       // ← return
            "message": "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;