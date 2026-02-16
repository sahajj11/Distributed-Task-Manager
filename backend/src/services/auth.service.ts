import bcrypt from "bcryptjs"
import prisma from "../config/db.ts"
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export const register=async(email : string , name: string , pass :string)=>{
    const hashedPassword=await bcrypt.hash(pass, 10)
    return await prisma.user.create({
        data:{email , name , password : hashedPassword  }
    })
}

export const login=async(email : string , pass : string)=>{
    const user = await prisma.user.findUnique({where:{email}})
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { user: { id: user.id, name: user.name, email: user.email }, token };
}