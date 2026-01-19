import { NextRequest, NextResponse } from "next/server";
import { refineNote } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { originalNote, currentContent, feedback } = await req.json();

    if (!originalNote || !currentContent || !feedback) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const stream = await refineNote(originalNote, currentContent, feedback);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI refinement error:", error);
    return NextResponse.json(
      { error: "Failed to refine note" },
      { status: 500 }
    );
  }
}
