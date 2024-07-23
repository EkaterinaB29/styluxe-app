import jwt from 'jsonwebtoken';


const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};




const verifyRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user contains the authenticated user's information
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
        }
    };
};


export default { authenticateToken, verifyRole };

