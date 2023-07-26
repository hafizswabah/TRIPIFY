import jwt from 'jsonwebtoken';
import AdminModel from '../Model/AdminModel.js'
// Middleware function to verify JWT token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 
    let Id = decoded.id;
    let admin = await AdminModel.findById(Id, { password: 0 })
 
    if (!admin) {
      res.json({ loggedIn: false })
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
