import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';

// Add authUser to Request interface
declare module 'express' {
  interface Request {
    authUser?: IUser;
  }
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Use authUser instead of user
    req.authUser = await User.findById(decoded.id).select('-password') as IUser;
    
    if (!req.authUser) {
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
  if (req.authUser?.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
  next();
};

export { protect, admin };