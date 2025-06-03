import jwt from 'jsonwebtoken';
import { CONFIG } from './config';

export function createJWT(payload: object): string {
  return jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, CONFIG.JWT_SECRET);
}
