import { redis } from '@/util/redis';
import { generateSecureWord } from '@/util/auth';
import { CONFIG } from '@/util/config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  const lastRequest = await redis.get(`user:${username}:lastRequest`);
  if (lastRequest && Date.now() - parseInt(lastRequest) < CONFIG.SECURE_WORD_REQUEST_GAP_SECONDS * 1000) {
    return NextResponse.json({ error: 'Too soon, try later' }, { status: 429 });
  }

  const word = generateSecureWord(username);
  await redis.setex(`user:${username}:secureWord`, CONFIG.SECURE_WORD_EXPIRY_SECONDS, word);
  await redis.set(`user:${username}:lastRequest`, Date.now().toString());

  return NextResponse.json({ secureWord: word });
}
