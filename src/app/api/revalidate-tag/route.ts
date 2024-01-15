import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    return Response.json({ error: 'No tag provided' }, { status: 400 });
  }

  revalidateTag(tag);

  return Response.json({
    revalidated: true,
    now: Date.now(),
    tag,
  });
}
