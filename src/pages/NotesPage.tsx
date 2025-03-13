import React, { FC, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Note, Member } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/GlobalNotesContext';
import Controls from '../components/Controls';
import { DEFAULT_NOTE_COLORS } from '../utils/constants';
import PlusIcon from '../icons/PlusIcon';
import { svgToCursor } from '../utils';
import SearchBox from '../components/SearchBox';

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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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
    if (activeMember) {
      setQueriedNotes([]);
      setSearchQuery('');
    }
    return notes.filter(note => !activeMember || note.memberId === activeMember.id);
  }, [notes, activeMember]);

  // Handle search result click to select a note
  const handleSearchResultClick = useCallback((note: Note) => {
    setSelectedNote(note);
    setSearchQuery('');
    
    // Optionally scroll to the selected note
    if (note) {
      const noteElement = document.getElementById(`note-${note.$id}`);
      if (noteElement) {
        noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        noteElement.classList.add('highlighted');
        setTimeout(() => {
          noteElement.classList.remove('highlighted');
        }, 2000);
      }
    }
  }, []);

  // Custom render function for note search results
  const renderNoteSearchResult = useCallback((note: Note) => {
    const noteText = note.body.trim() || "Empty note";
    const displayText = noteText.length > 30 ? `${noteText.substring(0, 30)}...` : noteText;
    
    return (
      <>
        <NoteDot $color={note.colors.colorHeader} />
        <span>{displayText}</span>
      </>
    );
  }, []);

  const displayedNotes = queriedNotes.length > 0 ? queriedNotes : filteredNotes;

  return (
    <PageContainer onClick={handlePageClick}>
      {notes.length > 0 && (
        <SearchBox
          data={notes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={setQueriedNotes}
          placeholder="Search notes..."
          filterFunction={(note, query) => 
            note.body.toLowerCase().includes(query.toLowerCase())
          }
          onResultClick={handleSearchResultClick}
          renderItem={renderNoteSearchResult}
        />
      )}
      {displayedNotes.map((note: Note) => (
        <NoteCard 
          key={note.$id} 
          note={note} 
          onDelete={() => deleteNote(note.$id)} 
          id={`note-${note.$id}`}
          className={`note-card ${selectedNote && selectedNote.$id === note.$id ? 'selected' : ''}`}
        />
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
  
  /* Highlighting for selected notes */
  .note-card.selected, .note-card.highlighted {
    box-shadow: 0 0 0 2px #4d79ff, 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
  
  .highlighted {
    animation: pulse 2s;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 2px #4d79ff, 0 4px 8px rgba(0, 0, 0, 0.2); }
    50% { box-shadow: 0 0 0 4px #4d79ff, 0 8px 16px rgba(0, 0, 0, 0.3); }
    100% { box-shadow: 0 0 0 2px #4d79ff, 0 4px 8px rgba(0, 0, 0, 0.2); }
  }
`;

const NoteDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

export default NotesPage;