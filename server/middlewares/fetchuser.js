const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    console.log(req.headers)
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = data

    next();
}


//FETCHUSER BUT WITH PROPER ERROR HANDLING


// const fetchUser = (req, res, next) => {
//     try {
//         console.log('Request Headers:', req.headers);

//         const token = req.header('auth-token');
//         if (!token) {
//             return res.status(401).json({ error: 'Access denied, no token provided' });
//         }

//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data;

//         next();
//     } catch (error) {
//         console.error('Error in fetchUser middleware:', error.message);

//         // Handle specific JWT errors
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Invalid token' });
//         }
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ error: 'Token expired' });
//         }

//         // Handle other errors
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


module.exports = fetchUser