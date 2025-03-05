import { FC } from 'react';
import { fakeData as notes, Note } from '../assets/fakeData';
import NoteCard from '../components/NoteCard';

const NotesPage: FC = () => {
  return (
    <div>
        {notes.map((note: Note) => (
            <NoteCard key={note.$id} note={note} />
        ))}
    </div>
  )
}

export default NotesPage