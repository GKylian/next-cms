import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    //TODO: add authentication so that only the owner of the site can revalidate (from the editor)

    const url = req.nextUrl.searchParams.get("url");
    if (!url) return NextResponse.json({ message: "No url provided" }, { status: 400 });

    revalidatePath(url);
    return NextResponse.json({ revalidated: true, now: Date.now()}, { status: 200 });
}