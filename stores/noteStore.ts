import { create } from "zustand";
import { Note, NoteList } from "@/lib/types";
import {
  createNote,
  updateNote,
  deleteNote,
  getUserNotes,
  getListNotes,
  getUserLists,
  createList,
  updateList,
  deleteList,
  initializeDefaultLists,
  searchNotes,
} from "@/lib/storage/firestore";

interface NoteStore {
  // State
  notes: Note[];
  lists: NoteList[];
  currentNote: Note | null;
  currentList: NoteList | null;
  isLoading: boolean;
  isExpanding: boolean;
  expandedContent: string;
  searchTerm: string;
  userId: string | null;

  // Note Actions
  setNotes: (notes: Note[]) => void;
  addNote: (note: Partial<Note>) => Promise<void>;
  updateNoteData: (noteId: string, updates: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  setCurrentNote: (note: Note | null) => void;
  loadUserNotes: (userId: string) => Promise<void>;
  loadListNotes: (userId: string, listId: string) => Promise<void>;
  searchUserNotes: (userId: string, term: string) => Promise<void>;

  // List Actions
  setLists: (lists: NoteList[]) => void;
  addList: (list: Partial<NoteList>) => Promise<void>;
  updateListData: (listId: string, updates: Partial<NoteList>) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  setCurrentList: (list: NoteList | null) => void;
  loadUserLists: (userId: string) => Promise<void>;
  initLists: (userId: string) => Promise<void>;

  // AI Actions
  setIsExpanding: (isExpanding: boolean) => void;
  setExpandedContent: (content: string) => void;
  clearExpandedContent: () => void;

  // Search Actions
  setSearchTerm: (term: string) => void;

  // User Actions
  setUserId: (userId: string | null) => void;

  // General Actions
  setIsLoading: (isLoading: boolean) => void;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  // Initial State
  notes: [],
  lists: [],
  currentNote: null,
  currentList: null,
  isLoading: false,
  isExpanding: false,
  expandedContent: "",
  searchTerm: "",
  userId: null,

  // Note Actions
  setNotes: (notes) => set({ notes }),

  addNote: async (noteData) => {
    const { userId } = get();
    if (!userId) return;

    set({ isLoading: true });
    try {
      const newNote = await createNote(userId, noteData);
      set((state) => ({ notes: [newNote, ...state.notes] }));
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateNoteData: async (noteId, updates) => {
    set({ isLoading: true });
    try {
      await updateNote(noteId, updates);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, ...updates } : note
        ),
      }));
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeNote: async (noteId) => {
    set({ isLoading: true });
    try {
      await deleteNote(noteId);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentNote: (note) => set({ currentNote: note }),

  loadUserNotes: async (userId) => {
    set({ isLoading: true });
    try {
      const notes = await getUserNotes(userId);
      set({ notes });
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadListNotes: async (userId, listId) => {
    set({ isLoading: true });
    try {
      const notes = await getListNotes(userId, listId);
      set({ notes });
    } catch (error) {
      console.error("Error loading list notes:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  searchUserNotes: async (userId, term) => {
    set({ isLoading: true, searchTerm: term });
    try {
      const notes = await searchNotes(userId, term);
      set({ notes });
    } catch (error) {
      console.error("Error searching notes:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // List Actions
  setLists: (lists) => set({ lists }),

  addList: async (listData) => {
    const { userId } = get();
    if (!userId) return;

    set({ isLoading: true });
    try {
      const newList = await createList(userId, listData);
      set((state) => ({ lists: [...state.lists, newList] }));
    } catch (error) {
      console.error("Error adding list:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateListData: async (listId, updates) => {
    set({ isLoading: true });
    try {
      await updateList(listId, updates);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === listId ? { ...list, ...updates } : list
        ),
      }));
    } catch (error) {
      console.error("Error updating list:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeList: async (listId) => {
    set({ isLoading: true });
    try {
      await deleteList(listId);
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== listId),
      }));
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentList: (list) => set({ currentList: list }),

  loadUserLists: async (userId) => {
    set({ isLoading: true });
    try {
      const lists = await getUserLists(userId);
      set({ lists });
    } catch (error) {
      console.error("Error loading lists:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  initLists: async (userId) => {
    set({ isLoading: true });
    try {
      await initializeDefaultLists(userId);
      const lists = await getUserLists(userId);
      set({ lists });
    } catch (error) {
      console.error("Error initializing lists:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // AI Actions
  setIsExpanding: (isExpanding) => set({ isExpanding }),
  setExpandedContent: (content) => set({ expandedContent: content }),
  clearExpandedContent: () => set({ expandedContent: "", isExpanding: false }),

  // Search Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  // User Actions
  setUserId: (userId) => set({ userId }),

  // General Actions
  setIsLoading: (isLoading) => set({ isLoading }),
}));
