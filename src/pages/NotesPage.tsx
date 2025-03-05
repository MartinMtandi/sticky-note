import { FC } from 'react';
import { Note } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../services/useNotes';

const NotesPage: FC = () => {
  const { notes } = useNotes();
  
  return (
    <div>
      {notes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  )
}

export default NotesPage