import React, { FC } from 'react';
import { Note } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../services/useNotes';

const NotesPage: FC = () => {
  const { notes } = useNotes();
  
  return (
    <React.Fragment>
      {notes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </React.Fragment>
  )
}

export default NotesPage