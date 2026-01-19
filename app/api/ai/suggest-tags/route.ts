import { NextRequest, NextResponse } from "next/server";
import { suggestTags } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const tags = await suggestTags(content);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Tag suggestion error:", error);
    return NextResponse.json(
      { error: "Failed to suggest tags" },
      { status: 500 }
    );
  }
}
