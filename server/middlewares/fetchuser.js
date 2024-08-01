const jwt = require('jsonwebtoken');
const JWT_SECRET = 'termiinatorx'

const fetchUser = (req, res, next) => {
    const token = req.get('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data

    next();
}

module.exports = fetchUser