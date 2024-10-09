import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const model = res.model;
    const slug = res.entry?.slug;
    const event = res.event;

    let tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
      tag = model;
    }
    if (event === "entry.update" && model === "blog") {
      tag = slug;
    }

    const secret = request.headers.get("revalidation-secret");

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json(
        { message: "Missing tag parameter" },
        { status: 400 }
      );
    }

    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
