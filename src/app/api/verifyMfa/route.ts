import { MOCK_USER } from '@/util/mockUser';
import { validateTOTP } from '@/util/auth';
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/util/config';
import { redis } from '@/util/redis';

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();

  // we don't have to use "username" here since we are using a mock user's data

  const MAX_ATTEMPTS = CONFIG.MFA_MAX_ATTEMPTS;

  const attemptsKey = `user:${MOCK_USER.username}:mfaAttempts`;
  const currentAttempts = parseInt((await redis.get(attemptsKey)) || '0', 10);

  if (currentAttempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Account locked due to too many failed attempts.' }, { status: 403 });
  }
  
  const valid = validateTOTP(MOCK_USER.mfaSecret, code);
  if (!valid) {
    await redis.set(attemptsKey, (currentAttempts + 1).toString());
    return NextResponse.json({ error: 'Invalid MFA code' }, { status: 401 });
  }

  await redis.del(attemptsKey);

  return NextResponse.json({ message: 'MFA success' });
}
