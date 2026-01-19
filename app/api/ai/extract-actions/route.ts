import { NextRequest, NextResponse } from "next/server";
import { extractActions } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const actions = await extractActions(content);

    return NextResponse.json({ actions });
  } catch (error) {
    console.error("Action extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract actions" },
      { status: 500 }
    );
  }
}
