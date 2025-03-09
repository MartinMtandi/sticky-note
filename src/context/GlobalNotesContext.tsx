import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note } from '../utils/types';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';

const STORAGE_KEY = 'sticky-notes-data';

const initialNotes: Note[] = [
  {
    $id: 1,
    body: 'Welcome to Sticky Notes! 📝\n\n' +
          '🎯 Quick Tips:\n\n' +
          '1. Add Team Members:\n' +
          '   • Click the "+" button\n' +
          '   • Enter their name and pick a color\n\n' +
          '2. Add a New Note:\n' +
          '   • Click anywhere on the canvas to create an unassigned note\n' +
          '   • Or select a member color first to create an assigned note\n\n' +
          '3. Filter Notes by Member:\n' +
          '   • Click a member\'s color\n' +
          '   • The notes will be filtered to show only notes assigned to that member\n' +
          '   • To remove the filter select the same member again\n\n' +
          '4. Assign Priority:\n' +
          '   • Click on the dot next to the Member name on the note\n' +
          '   • This will toggle between different Priority states\n\n' +
          '5. Assign Notes:\n' +
          '   • Click the menu button on the top right corner of the note\n' +
          '   • This will open a menu that allows you to assign the note to a member.\n' +
          '   • You need to have a member(s) added before you can assign a note to a member.\n\n' +
          'Try it out! Drag me around and create more notes!',
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
