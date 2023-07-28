import jwt from 'jsonwebtoken';
import UserModel from '../Model/UserModel.js';

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
 
    let userId = decodedUser.id;
    let user = await UserModel.findById(userId, { password: 0 })

    if (!user) {
      res.json({ loggedIn: false })
    }
    req.user=user
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
