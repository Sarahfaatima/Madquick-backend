
const jwt = require('jsonwebtoken');
const User = require("../Models/User");

const ensureAuthenticated = async (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        console.log('---authenticated user---', user);
         if (!user) return res.status(401).json({ message: "User not found" });

         req.user = user; // attach user to request
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;