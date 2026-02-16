import type { Request, Response } from "express";
import * as AuthService from '../services/auth.service.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await AuthService.register(email, name, password);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    
    res.status(200).json(result); // Returns { user, token }
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};