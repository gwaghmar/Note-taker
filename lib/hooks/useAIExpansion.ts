"use client";

import { useState } from "react";

interface UseAIExpansionReturn {
  isExpanding: boolean;
  expandedContent: string;
  error: string | null;
  expand: (
    note: string,
    context?: { desiredLength?: "brief" | "detailed" | "comprehensive" }
  ) => Promise<void>;
  refine: (
    originalNote: string,
    currentContent: string,
    feedback: string
  ) => Promise<void>;
  reset: () => void;
}

export function useAIExpansion(): UseAIExpansionReturn {
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandedContent, setExpandedContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const expand = async (
    note: string,
    context?: { desiredLength?: "brief" | "detailed" | "comprehensive" }
  ) => {
    if (!note.trim()) return;

    setIsExpanding(true);
    setExpandedContent("");
    setError(null);

    try {
      const response = await fetch("/api/ai/expand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note, context }),
      });

      if (!response.ok) {
        throw new Error("Failed to expand note");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedContent = "";

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
                  accumulatedContent += content;
                  setExpandedContent(accumulatedContent);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to expand note";
      setError(errorMessage);
      console.error("Expansion error:", err);
    } finally {
      setIsExpanding(false);
    }
  };

  const refine = async (
    originalNote: string,
    currentContent: string,
    feedback: string
  ) => {
    if (!feedback.trim()) return;

    setIsExpanding(true);
    setExpandedContent("");
    setError(null);

    try {
      const response = await fetch("/api/ai/refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalNote,
          currentContent,
          feedback,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refine note");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedContent = "";

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
                  accumulatedContent += content;
                  setExpandedContent(accumulatedContent);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refine note";
      setError(errorMessage);
      console.error("Refinement error:", err);
    } finally {
      setIsExpanding(false);
    }
  };

  const reset = () => {
    setExpandedContent("");
    setError(null);
    setIsExpanding(false);
  };

  return {
    isExpanding,
    expandedContent,
    error,
    expand,
    refine,
    reset,
  };
}
