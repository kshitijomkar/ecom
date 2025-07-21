import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: typeof User;
    }
  }
}

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
  next();
};

export { protect, admin };