import React, { FC, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Note, Member } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/GlobalNotesContext';
import Controls from '../components/Controls';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';
import PlusIcon from '../icons/PlusIcon';
import { svgToCursor } from '../utils';
import SearchTask from '../components/SearchTask';

// Pre-generate cursor URL for better performance
// Using a larger plus icon (24px) for better visibility
// Using white cursor with dark outline for better contrast
const PLUS_CURSOR = svgToCursor(
  <PlusIcon 
    size={24}  // Larger size for better visibility
    color="#FFFFFF"  // Pure white with dark outline for visibility
    strokeWidth={2.5}  // Match priority dot style
  />
);

const NotesPage: FC = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [queriedNotes, setQueriedNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't create note if clicking on a note or controls
    if ((e.target as HTMLElement).closest('.note-card, .controls')) {
      return;
    }

    // Account for scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Create new note with MEDIUM priority (orange #FFA500)
    // All notes must have a priority, defaulting to MEDIUM
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
      },
      priority: 'MEDIUM'  // Default to MEDIUM priority (orange #FFA500)
    });
  }, [addNote, activeMember]);

  // Filter notes based on active member
  const filteredNotes = useMemo(() => {
    if(activeMember){
      setQueriedNotes([]);
      setSearchQuery('');
    }
    return notes.filter(note => !activeMember || note.memberId === activeMember.id);
  }, [notes, activeMember]);

  const displayedNotes = queriedNotes.length > 0 ? queriedNotes : filteredNotes;

  return (
    <PageContainer onClick={handlePageClick}>
      {notes.length > 0 && (
        <SearchTask 
          notes={notes}
          onSearch={setQueriedNotes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        setActiveMember={setActiveMember}
      />)}
      {displayedNotes.map((note: Note) => (
        <NoteCard key={note.$id} note={note} onDelete={() => deleteNote(note.$id)} />
      ))}
      <Controls 
        onActiveMemberChange={setActiveMember}
        activeMember={activeMember}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  cursor: url('${PLUS_CURSOR}') 12 12, crosshair;

  /* Ensure cursor applies to all non-interactive elements */
  & > *:not(.note-card, .controls, button, [role="button"], input, textarea, select) {
    cursor: inherit;
  }

  /* Prevent cursor inheritance on disabled elements */
  & > *[disabled], & > *[aria-disabled="true"] {
    cursor: not-allowed;
  }
`;

export default NotesPage;