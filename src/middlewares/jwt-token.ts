import * as jwt from 'jsonwebtoken';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { prisma } from '../prisma';

interface Request extends ExpressRequest {
  user?: string | jwt.JwtPayload | undefined;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if(req.baseUrl.includes('user/') ) {
    const userAdminExists = await prisma.users.count({
      where:{
        role: "administrator"
      }
    })
    if( userAdminExists === 0 ) {
      return next()
    }
  }
  
  const secret = process.env.JWT_SECRET || 'def@ult-4nd-INSECURITY-s3cr3t';
  const token = req.headers.authorization?.split(' ')[1] || '';
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}