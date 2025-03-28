const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
       return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
}


module.exports = auth;

// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('X-Auth-Token');
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied: No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         console.log("Decoded user: ", decoded);
//         req.user = decoded;  // req.user'ı doğru ayarlıyoruz
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid Token or Token Expired' });
//     }
// };

// module.exports = auth;

