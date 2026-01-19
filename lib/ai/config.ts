export const AI_CONFIG = {
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseUrl: "https://openrouter.ai/api/v1",
  model: "anthropic/claude-3.5-sonnet",
  defaultMaxTokens: 1024,
};

export const EXPANSION_PROMPT = `You are an expert idea expander and note-taking assistant. Your goal is to take brief notes and expand them into well-structured, actionable content.

Guidelines:
1. Maintain user's original intent and voice
2. Add relevant details and context
3. Structure information logically
4. Identify action items
5. Ask clarifying questions when needed
6. Be concise yet comprehensive
7. Use markdown formatting

When expanding a note:
- Clarity: Make the idea crystal clear
- Structure: Organize into logical sections
- Actionability: Extract concrete next steps
- Context: Add relevant background
- Questions: Identify what's unclear

Provide your expansion in markdown format with clear sections.`;

export const REFINEMENT_PROMPT = `You are helping refine an idea based on user feedback.

Your task is to improve the content while:
1. Maintaining the core message
2. Incorporating user feedback
3. Keeping the structure clear
4. Being concise and actionable

Refine the content based on the specific feedback provided.`;

export const TAG_SUGGESTION_PROMPT = `Analyze the following content and suggest 3-5 relevant tags.
Return ONLY a JSON array of strings, nothing else.
Example: ["productivity", "health", "planning"]

Content:`;

export const ACTION_EXTRACTION_PROMPT = `Extract actionable items from the following content.
Return ONLY a JSON array of action items, nothing else.
Example: ["Research competitors", "Create prototype", "Schedule meeting"]

Content:`;
