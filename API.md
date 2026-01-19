# Smart Note AI - API Documentation

## Overview

Smart Note AI provides RESTful API endpoints for AI-powered note expansion and refinement.

## Base URL

```
Production: https://your-domain.vercel.app/api
Development: http://localhost:3000/api
```

## Authentication

All API endpoints require authentication via Firebase Authentication. Include the Firebase ID token in your requests:

```javascript
const token = await user.getIdToken();

fetch('/api/ai/expand', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Endpoints

### POST /api/ai/expand

Expand a brief note into detailed, structured content using AI.

**Request Body:**
```json
{
  "note": "create a fitness app",
  "context": {
    "desiredLength": "detailed"
  }
}
```

**Parameters:**
- `note` (string, required): The original note content to expand
- `context` (object, optional):
  - `desiredLength` (string): "brief" | "detailed" | "comprehensive"

**Response:**

Server-Sent Events (SSE) stream with chunks of expanded content.

**Example:**
```javascript
const response = await fetch('/api/ai/expand', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    note: "create a fitness app",
    context: { desiredLength: "detailed" }
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  // Process chunk
}
```

**Status Codes:**
- `200 OK`: Stream started successfully
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Missing or invalid authentication
- `500 Internal Server Error`: AI service error

---

### POST /api/ai/refine

Refine expanded content based on user feedback.

**Request Body:**
```json
{
  "originalNote": "create a fitness app",
  "currentContent": "# Fitness App Concept\n\n...",
  "feedback": "make it shorter and focus on core features"
}
```

**Parameters:**
- `originalNote` (string, required): The original brief note
- `currentContent` (string, required): The current expanded content
- `feedback` (string, required): User's refinement instructions

**Response:**

Server-Sent Events (SSE) stream with refined content.

**Status Codes:**
- `200 OK`: Stream started successfully
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Missing or invalid authentication
- `500 Internal Server Error`: AI service error

---

### POST /api/ai/suggest-tags

Get AI-generated tag suggestions for content.

**Request Body:**
```json
{
  "content": "A fitness app that tracks workouts..."
}
```

**Parameters:**
- `content` (string, required): The content to analyze for tags

**Response:**
```json
{
  "tags": ["fitness", "health", "mobile-app", "tracking"]
}
```

**Status Codes:**
- `200 OK`: Tags generated successfully
- `400 Bad Request`: Missing content
- `401 Unauthorized`: Missing or invalid authentication
- `500 Internal Server Error`: AI service error

---

### POST /api/ai/extract-actions

Extract actionable items from content.

**Request Body:**
```json
{
  "content": "# Project Plan\n\n1. Research competitors\n2. Create wireframes..."
}
```

**Parameters:**
- `content` (string, required): The content to extract actions from

**Response:**
```json
{
  "actions": [
    "Research competitors",
    "Create wireframes",
    "Develop prototype",
    "Conduct user testing"
  ]
}
```

**Status Codes:**
- `200 OK`: Actions extracted successfully
- `400 Bad Request`: Missing content
- `401 Unauthorized`: Missing or invalid authentication
- `500 Internal Server Error`: AI service error

---

## Rate Limiting

- Free tier: 100 requests per day per user
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: Total allowed requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Timestamp when limit resets

**Rate Limit Response:**
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600
}
```

**Status Code:** `429 Too Many Requests`

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "details": "Optional detailed error information"
}
```

**Common Error Codes:**
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or invalid
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: AI service temporarily unavailable

---

## Streaming Responses

AI expansion and refinement endpoints use Server-Sent Events (SSE) for streaming responses.

**SSE Format:**
```
data: {"choices":[{"delta":{"content":"Hello"}}]}

data: {"choices":[{"delta":{"content":" world"}}]}

data: [DONE]
```

**Client Implementation:**
```javascript
async function streamAIResponse(endpoint, body) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulatedContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || '';
          accumulatedContent += content;
          // Update UI with accumulated content
        } catch (e) {
          console.error('Parse error:', e);
        }
      }
    }
  }

  return accumulatedContent;
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { useAIExpansion } from '@/lib/hooks/useAIExpansion';

function MyComponent() {
  const { expand, isExpanding, expandedContent } = useAIExpansion();

  const handleExpand = async () => {
    await expand("my brief note", {
      desiredLength: "detailed"
    });
  };

  return (
    <div>
      {isExpanding && <Loader />}
      {expandedContent && <Content text={expandedContent} />}
    </div>
  );
}
```

### React Hook

```typescript
const { expand, refine, isExpanding, expandedContent, error, reset } = useAIExpansion();

// Expand note
await expand("note content", { desiredLength: "brief" });

// Refine content
await refine("original", "current", "feedback");

// Reset state
reset();
```

---

## Best Practices

1. **Handle Streaming Gracefully**: Implement proper error handling for network interruptions
2. **Show Progress**: Display loading indicators during streaming
3. **Cache Results**: Cache expanded content to avoid redundant API calls
4. **Batch Requests**: Group multiple operations when possible
5. **Implement Retry Logic**: Retry failed requests with exponential backoff
6. **Monitor Rate Limits**: Track and display remaining requests to users
7. **Validate Input**: Validate user input before sending to API
8. **Sanitize Output**: Sanitize AI-generated content before displaying

---

## Changelog

### Version 1.0.0 (2026-01-19)
- Initial API release
- AI expansion endpoint
- AI refinement endpoint
- Tag suggestion endpoint
- Action extraction endpoint
- SSE streaming support

---

## Support

For API issues or questions:
- GitHub Issues: https://github.com/gwaghmar/Note-taker/issues
- Email: support@example.com

---

## License

This API documentation is part of Smart Note AI and is licensed under the MIT License.
