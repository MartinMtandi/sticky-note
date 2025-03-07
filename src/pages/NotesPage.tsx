import React, { FC, useCallback } from 'react';
import { Note } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../services/useNotes';
import Controls from '../components/Controls';
import { useMembers } from '../services/useMembers';

const NotesPage: FC = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const { members } = useMembers();
  
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't create note if clicking on a note or controls
    if ((e.target as HTMLElement).closest('.note-card, .controls')) {
      return;
    }

    // Get first member's colors or use default colors
    const defaultColors = {
      id: "default",
      colorHeader: "#FFEFBE",
      colorBody: "#FFF7E1",
      colorText: "#18181A"
    };

    // Extract just the color properties from the member
    const firstMember = members[0];
    const colors = firstMember ? {
      id: firstMember.id,
      colorHeader: firstMember.colorHeader,
      colorBody: firstMember.colorBody,
      colorText: firstMember.colorText
    } : defaultColors;

    // Account for scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    addNote({
      body: '',
      colors,
      position: {
        x: e.clientX + scrollX,
        y: e.clientY + scrollY
      }
    });
  }, [addNote, members]);
  
  return (
    <div onClick={handlePageClick} style={{ height: '100%', width: '100%', position: 'relative' }}>
      {notes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} onDelete={() => deleteNote(note.$id)} />
      ))}
      <Controls className="controls" />
    </div>
  );
};

export default NotesPage;