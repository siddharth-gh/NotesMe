const jwt = require('jsonwebtoken');
const JWT_SECRET = 'termiinatorx'

const fetchUser = (req, res, next) => {
    console.log(req.headers)
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data

    next();
}

module.exports = fetchUser