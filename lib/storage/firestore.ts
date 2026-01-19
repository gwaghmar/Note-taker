import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Note, NoteList } from "@/lib/types";
import { nanoid } from "nanoid";

// Helper to check if db is initialized
function ensureDb() {
  if (!db) {
    throw new Error("Firestore is not initialized. Please check your Firebase configuration.");
  }
  return db;
}

// Notes Operations
export async function createNote(userId: string, noteData: Partial<Note>) {
  const firestore = ensureDb();
  const now = Timestamp.now();

  const note: Note = {
    id: "", // Will be set by Firestore
    userId,
    listId: noteData.listId || "inbox",
    originalContent: noteData.originalContent || "",
    expandedContent: noteData.expandedContent,
    finalContent: noteData.finalContent || noteData.originalContent || "",
    title: noteData.title,
    tags: noteData.tags || [],
    isExpanded: noteData.isExpanded || false,
    isFavorite: noteData.isFavorite || false,
    aiMetadata: noteData.aiMetadata,
    versions: noteData.versions || [],
    createdAt: now,
    updatedAt: now,
    expandedAt: noteData.expandedAt,
  };

  const docRef = await addDoc(collection(firestore, "notes"), note);
  return { ...note, id: docRef.id };
}

export async function updateNote(noteId: string, updates: Partial<Note>) {
  const firestore = ensureDb();
  const noteRef = doc(firestore, "notes", noteId);
  await updateDoc(noteRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteNote(noteId: string) {
  const firestore = ensureDb();
  const noteRef = doc(firestore, "notes", noteId);
  await deleteDoc(noteRef);
}

export async function getNote(noteId: string): Promise<Note | null> {
  const firestore = ensureDb();
  const noteRef = doc(firestore, "notes", noteId);
  const noteSnap = await getDoc(noteRef);

  if (noteSnap.exists()) {
    return noteSnap.data() as Note;
  }
  return null;
}

export async function getUserNotes(userId: string): Promise<Note[]> {
  const firestore = ensureDb();
  const notesQuery = query(
    collection(firestore, "notes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(notesQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[];
}

export async function getListNotes(
  userId: string,
  listId: string
): Promise<Note[]> {
  const firestore = ensureDb();
  const notesQuery = query(
    collection(firestore, "notes"),
    where("userId", "==", userId),
    where("listId", "==", listId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(notesQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[];
}

// Lists Operations
export async function createList(
  userId: string,
  listData: Partial<NoteList>
): Promise<NoteList> {
  const firestore = ensureDb();
  const now = Timestamp.now();

  const list: NoteList = {
    id: "", // Will be set by Firestore
    userId,
    name: listData.name || "New List",
    description: listData.description,
    color: listData.color || "#7C3AED",
    icon: listData.icon,
    noteCount: 0,
    createdAt: now,
    updatedAt: now,
    settings: listData.settings || {
      autoAIExpansion: false,
      defaultExpansionLength: "detailed",
      sortOrder: "newest",
    },
  };

  const docRef = await addDoc(collection(firestore, "lists"), list);
  return { ...list, id: docRef.id };
}

export async function updateList(listId: string, updates: Partial<NoteList>) {
  const firestore = ensureDb();
  const listRef = doc(firestore, "lists", listId);
  await updateDoc(listRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteList(listId: string) {
  const firestore = ensureDb();
  const listRef = doc(firestore, "lists", listId);
  await deleteDoc(listRef);
}

export async function getUserLists(userId: string): Promise<NoteList[]> {
  const firestore = ensureDb();
  const listsQuery = query(
    collection(firestore, "lists"),
    where("userId", "==", userId),
    orderBy("createdAt", "asc")
  );

  const querySnapshot = await getDocs(listsQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as NoteList[];
}

// Initialize default lists for new users
export async function initializeDefaultLists(userId: string) {
  const defaultLists = [
    {
      name: "Inbox",
      description: "Default list for new notes",
      color: "#7C3AED",
      icon: "inbox",
    },
    {
      name: "Ideas",
      description: "Creative ideas and concepts",
      color: "#EC4899",
      icon: "lightbulb",
    },
    {
      name: "Action Items",
      description: "Tasks and action items",
      color: "#10B981",
      icon: "check-circle",
    },
    {
      name: "Archive",
      description: "Archived notes",
      color: "#6B7280",
      icon: "archive",
    },
  ];

  for (const listData of defaultLists) {
    await createList(userId, listData);
  }
}

// Search notes
export async function searchNotes(
  userId: string,
  searchTerm: string
): Promise<Note[]> {
  // Note: Firestore doesn't support full-text search natively.
  // This basic implementation fetches all notes and filters client-side.
  // For production with large datasets, consider:
  // - Algolia for full-text search
  // - Elasticsearch for advanced queries
  // - Firebase Extensions for Firestore full-text search
  // - Typesense for typo-tolerant search
  const notes = await getUserNotes(userId);
  const lowerSearchTerm = searchTerm.toLowerCase();

  return notes.filter((note) => {
    const titleMatch = note.title?.toLowerCase().includes(lowerSearchTerm);
    const contentMatch = note.finalContent
      .toLowerCase()
      .includes(lowerSearchTerm);
    const tagMatch = note.tags.some((tag) =>
      tag.toLowerCase().includes(lowerSearchTerm)
    );

    return titleMatch || contentMatch || tagMatch;
  });
}
