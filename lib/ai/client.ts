import { AI_CONFIG, EXPANSION_PROMPT } from "./config";

export async function expandNote(
  note: string,
  context?: {
    desiredLength?: "brief" | "detailed" | "comprehensive";
  }
): Promise<ReadableStream> {
  const maxTokens =
    context?.desiredLength === "brief"
      ? 512
      : context?.desiredLength === "comprehensive"
        ? 2048
        : 1024;

  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
      "HTTP-Referer": "https://smart-note-ai.vercel.app",
      "X-Title": "Smart Note AI",
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "system",
          content: EXPANSION_PROMPT,
        },
        {
          role: "user",
          content: `Original Note: ${note}\n\nExpand this note following the principles outlined.`,
        },
      ],
      max_tokens: maxTokens,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  return response.body!;
}

export async function refineNote(
  originalNote: string,
  currentContent: string,
  feedback: string
): Promise<ReadableStream> {
  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
      "HTTP-Referer": "https://smart-note-ai.vercel.app",
      "X-Title": "Smart Note AI",
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "system",
          content: `You are helping refine an idea based on user feedback.

Your task is to improve the content while:
1. Maintaining the core message
2. Incorporating user feedback
3. Keeping the structure clear
4. Being concise and actionable`,
        },
        {
          role: "user",
          content: `Original Note: ${originalNote}

Current Expansion: ${currentContent}

User Feedback: ${feedback}

Refine the expansion based on the feedback.`,
        },
      ],
      max_tokens: 1024,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  return response.body!;
}

export async function suggestTags(content: string): Promise<string[]> {
  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
      "HTTP-Referer": "https://smart-note-ai.vercel.app",
      "X-Title": "Smart Note AI",
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "user",
          content: `Analyze the following content and suggest 3-5 relevant tags.
Return ONLY a JSON array of strings, nothing else.
Example: ["productivity", "health", "planning"]

Content: ${content}`,
        },
      ],
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content_text = data.choices[0]?.message?.content || "[]";
  
  try {
    return JSON.parse(content_text);
  } catch {
    return [];
  }
}

export async function extractActions(content: string): Promise<string[]> {
  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
      "HTTP-Referer": "https://smart-note-ai.vercel.app",
      "X-Title": "Smart Note AI",
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "user",
          content: `Extract actionable items from the following content.
Return ONLY a JSON array of action items, nothing else.
Example: ["Research competitors", "Create prototype", "Schedule meeting"]

Content: ${content}`,
        },
      ],
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content_text = data.choices[0]?.message?.content || "[]";
  
  try {
    return JSON.parse(content_text);
  } catch {
    return [];
  }
}
