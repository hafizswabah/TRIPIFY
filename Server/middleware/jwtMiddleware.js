import jwt from 'jsonwebtoken';

// Middleware function to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.adminToken;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id; // Attach the decoded user ID to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
