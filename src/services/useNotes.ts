import { useState, useEffect } from 'react';
import { Note } from '../utils/types';

const STORAGE_KEY = 'sticky-notes-data';

// Initial data for first-time users
const initialNotes: Note[] = [
    {
        $id: 1,
        body: 'Welcome to Sticky Notes!\n\nDrag me around and try adding more notes!',
        colors: {
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        },
        position: { x: 50, y: 50 },
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
