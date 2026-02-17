import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("Token:", token);


  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key') as { userId: string };
    req.userId = decoded.userId; // Add userId to the request
    next();
  } catch (error) {
    console.log("JWT verify error:", error);

    res.status(400).json({ error: 'Invalid token.' });
  }
};