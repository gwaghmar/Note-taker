"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Brain, Plus, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [noteContent, setNoteContent] = useState("");
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandedContent, setExpandedContent] = useState("");

  const handleExpand = async () => {
    if (!noteContent.trim()) return;

    setIsExpanding(true);
    setExpandedContent("");

    try {
      const response = await fetch("/api/ai/expand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: noteContent,
          context: {
            desiredLength: "detailed",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to expand note");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  setExpandedContent((prev) => prev + content);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Expansion error:", error);
      alert("Failed to expand note. Please try again.");
    } finally {
      setIsExpanding(false);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality with Firebase
    alert("Save functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Smart Note AI</h1>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Note Input */}
        <Card className="mb-8 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Quick Note</h2>
          </div>
          <Textarea
            placeholder="Start typing your idea... (e.g., 'create a fitness app')"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="mb-4 min-h-[120px]"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleExpand}
              disabled={!noteContent.trim() || isExpanding}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isExpanding ? "Expanding..." : "Expand with AI"}
            </Button>
            <Button
              onClick={handleSave}
              variant="outline"
              disabled={!noteContent.trim()}
            >
              Save
            </Button>
          </div>
        </Card>

        {/* Expanded Content */}
        {(isExpanding || expandedContent) && (
          <Card className="mb-8 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">AI Expanded Version</h2>
            </div>
            {isExpanding && !expandedContent && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                <span>AI is thinking...</span>
              </div>
            )}
            {expandedContent && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                  {expandedContent}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    Accept & Save
                  </Button>
                  <Button size="sm" variant="outline">
                    Refine
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setExpandedContent("");
                      setNoteContent("");
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Coming Soon Section */}
        <Card className="p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            More Features Coming Soon
          </h3>
          <p className="text-gray-600">
            Lists, search, tags, and collaborative refinement will be available
            soon!
          </p>
        </Card>
      </div>
    </div>
  );
}
