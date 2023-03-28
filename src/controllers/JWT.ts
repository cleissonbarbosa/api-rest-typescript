import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET || 'def@ult-4nd-INSECURITY-s3cr3t';
  const options: jwt.SignOptions = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secret, options);
}