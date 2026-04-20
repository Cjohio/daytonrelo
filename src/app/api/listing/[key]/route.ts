import { NextRequest, NextResponse } from "next/server";
import { getListingByKey } from "@/lib/trestle";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  try {
    const listing = await getListingByKey(key);
    if (!listing) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(listing);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
