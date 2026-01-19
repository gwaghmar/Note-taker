import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  preferences: UserPreferences;
  usage: UserUsage;
  createdAt: Timestamp;
}

export interface UserPreferences {
  defaultList: string;
  autoExpand: boolean;
  expansionLength: "brief" | "detailed" | "comprehensive";
  theme: "light" | "dark" | "auto";
}

export interface UserUsage {
  notesCreated: number;
  aiExpansions: number;
  lastActive: Timestamp;
}

export interface NoteList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  noteCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  settings: ListSettings;
}

export interface ListSettings {
  autoAIExpansion: boolean;
  defaultExpansionLength: "brief" | "detailed" | "comprehensive";
  sortOrder: "newest" | "oldest" | "alphabetical";
}

export interface Note {
  id: string;
  userId: string;
  listId: string;
  originalContent: string;
  expandedContent?: string;
  finalContent: string;
  title?: string;
  tags: string[];
  isExpanded: boolean;
  isFavorite: boolean;
  aiMetadata?: AIMetadata;
  versions: NoteVersion[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expandedAt?: Timestamp;
}

export interface AIMetadata {
  expansionTokens: number;
  refinementCount: number;
  expansionType: string;
  suggestions: {
    actionItems: string[];
    questions: string[];
    relatedTopics: string[];
  };
}

export interface NoteVersion {
  id: string;
  content: string;
  type: "original" | "ai_expansion" | "user_edit" | "refinement";
  timestamp: Timestamp;
}

export interface AIConversation {
  id: string;
  noteId: string;
  userId: string;
  messages: Message[];
  createdAt: Timestamp;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Timestamp;
}

export interface ExpansionContext {
  previousNotes?: string[];
  userPreferences?: UserPreferences;
  targetAudience?: string;
  desiredLength?: "brief" | "detailed" | "comprehensive";
}

export interface ExpansionRequest {
  originalNote: string;
  context?: ExpansionContext;
}

export interface ExpansionResponse {
  expandedContent: string;
  suggestions: {
    title: string;
    keyPoints: string[];
    actionItems: string[];
    relatedTopics: string[];
    questions: string[];
  };
  metadata: {
    tokensUsed: number;
    confidenceScore: number;
    expansionType: string;
  };
}
