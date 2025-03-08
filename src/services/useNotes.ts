import { useState, useEffect } from 'react';
import { Note } from '../utils/types';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';

const STORAGE_KEY = 'sticky-notes-data';

// Initial data for first-time users
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
              'Try it out! Drag me around and create more notes!',
        colors: DEFAULT_NOTE_COLORS,
        position: { x: 300, y: 50 },
    }
];

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    // Load notes from localStorage on initial mount
    useEffect(() => {
        const savedNotes = localStorage.getItem(STORAGE_KEY);
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        } else {
            // If no saved notes, set initial notes
            setNotes(initialNotes);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));
        }
    }, []);

    // Save notes whenever they change
    const saveNotes = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    };

    const addNote = (note: Omit<Note, '$id'>) => {
        const newNote: Note = {
            ...note,
            $id: Date.now(), // Use timestamp as unique ID
        };
        saveNotes([...notes, newNote]);
    };

    const updateNote = (updatedNote: Note) => {
        const updatedNotes = notes.map((note: Note) => 
            note.$id === updatedNote.$id ? updatedNote : note
        );
        saveNotes(updatedNotes);
    };

    const deleteNote = (noteId: number) => {
        setNotes((prevNotes) => {
            const filteredNotes = prevNotes.filter((note) => note.$id !== noteId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
            return filteredNotes;
        });
    };    

    return {
        notes,
        addNote,
        updateNote,
        deleteNote
    };
};
