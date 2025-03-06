import React, { FC } from 'react';
import { Note } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../services/useNotes';
import Controls from '../components/Controls';

const NotesPage: FC = () => {
  const { notes, deleteNote  } = useNotes();
  
  return (
    <React.Fragment>
      {notes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} onDelete={() => deleteNote(note.$id)} />
      ))}
      <Controls />
    </React.Fragment>
  )
}

export default NotesPage