import { authenticator } from 'otplib';
import crypto from 'crypto';
import { redis } from './redis';

export function generateSecureWord(username: string): string {
  return crypto.randomBytes(3).toString('hex'); // 6-char word
}

export async function generateAndStoreTOTP(username: string, secret: string): Promise<string> {
  const token = authenticator.generate(secret);
  await redis.set(`user:${username}:mfaToken`, token, 'EX', 60);
  const attemptsKey = `user:${username}:mfaAttempts`;
  await redis.del(attemptsKey);
  return token;
}

export function validateTOTP(secret: string, token: string) {
  return authenticator.check(token, secret);
}
