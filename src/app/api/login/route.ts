import { redis } from '@/util/redis';
import { createJWT } from '@/util/jwt';
import { MOCK_USER } from '@/util/mockUser';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { generateAndStoreTOTP } from '@/util/auth';

export async function POST(req: NextRequest) {
  const { username, hashedPassword, secureWord } = await req.json();

  if (username !== MOCK_USER.username || hashedPassword !== MOCK_USER.passwordHash) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const storedWord = await redis.get(`user:${username}:secureWord`);
  if (!storedWord || storedWord !== secureWord) {
    return NextResponse.json({ error: 'Invalid or expired secure word' }, { status: 401 });
  }

  const mfaCode = await generateAndStoreTOTP(username, MOCK_USER.mfaSecret);
  console.log(`[DEBUG] MFA Code for ${username}:`, mfaCode); // So we know what's the MFA code. (Only for testing))

  const token = createJWT({ username });

  const response = NextResponse.json({ message: 'Login success' });
  response.headers.set('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 3600,
  }));

  return response;
}
