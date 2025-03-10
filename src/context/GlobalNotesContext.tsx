import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note } from '../utils/types';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';

const STORAGE_KEY = 'sticky-notes-data';

const initialNotes: Note[] = [
  {
    $id: 1,
    body: "Welcome to Sticky Notes! 📝\n\n" +
      "🎯 Quick Tips:\n\n" +
      "• Add Members: Click \"+\" → Enter name & pick a color.\n" +
      "• Create Notes: Click anywhere or select a member first.\n" +
      "• Filter Notes: Click a member's color to show/hide their notes.\n" +
      "• Set Priority: Click the Priority Pill to toggle.\n" +
      "• Assign Notes: Use the menu button on a note (members required).\n\n" +
      "Try it out! Drag me around & add more notes!",
    colors: DEFAULT_NOTE_COLORS,
    position: { x: 300, y: 50 }
  }
];

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, '$id'>) => void;
  updateNote: (updatedNote: Note) => void;
  deleteNote: (noteId: number) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });

  // Sync notes with localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Omit<Note, '$id'>) => {
    const newNote: Note = { ...note, $id: Date.now() };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.$id === updatedNote.$id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== noteId));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
