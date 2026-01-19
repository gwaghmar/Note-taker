import { NextRequest, NextResponse } from "next/server";
import { expandNote } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { note, context } = await req.json();

    if (!note || typeof note !== "string") {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const stream = await expandNote(note, context);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI expansion error:", error);
    return NextResponse.json(
      { error: "Failed to expand note" },
      { status: 500 }
    );
  }
}
