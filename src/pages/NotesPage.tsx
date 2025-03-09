import React, { FC, useCallback, useState, useMemo } from 'react';
import { Note, Member } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/GlobalNotesContext';
import Controls from '../components/Controls';
import TaskPriorityKey from '../components/TaskPriorityKey';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';

const NotesPage: FC = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't create note if clicking on a note or controls
    if ((e.target as HTMLElement).closest('.note-card, .controls')) {
      return;
    }

    // Account for scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    addNote({
      body: '',
      colors: activeMember ? {
        colorHeader: activeMember.colorHeader,
        colorBody: activeMember.colorBody,
        colorText: activeMember.colorText
      } : DEFAULT_NOTE_COLORS,
      memberId: activeMember?.id,
      position: {
        x: e.clientX + scrollX,
        y: e.clientY + scrollY
      }
    });
  }, [addNote, activeMember]);

  // Filter notes based on active member
  const filteredNotes = useMemo(() => {
    if (!activeMember) return notes;
    return notes.filter(note => note.memberId === activeMember.id);
  }, [notes, activeMember]);
  
  return (
    <div onClick={handlePageClick} style={{ height: '100%', width: '100%', position: 'relative' }}>
      <TaskPriorityKey />
      {filteredNotes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} onDelete={() => deleteNote(note.$id)} />
      ))}
      <Controls 
        className="controls" 
        onActiveMemberChange={setActiveMember}
        activeMember={activeMember}
      />
    </div>
  );
};

export default NotesPage;