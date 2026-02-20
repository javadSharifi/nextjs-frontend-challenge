import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const apiParams = new URLSearchParams(searchParams);
  apiParams.set('key', process.env.RAWG_API_KEY!);

  const res = await fetch(`https://api.rawg.io/api/games?${apiParams.toString()}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) return NextResponse.json({ error: 'Failed' }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}
