import React, { FC, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Note, Member } from '../utils/types';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/GlobalNotesContext';
import { useMembers } from '../context/GlobalMembersContext';
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
  const { getMember } = useMembers();
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [queriedNotes, setQueriedNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Handle page click - also clears all search filters
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't create note if clicking on a note or controls
    if ((e.target as HTMLElement).closest('.note-card, .controls')) {
      return;
    }

    // Get the member to use for the new note (prefer the selected note's member over active member)
    const memberToUse = selectedNote?.memberId 
      ? getMember(selectedNote.memberId) || activeMember 
      : activeMember;

    // Clear all search filters
    setSelectedNote(null);
    setQueriedNotes([]);
    setSearchQuery('');

    // Account for scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Create new note with MEDIUM priority (orange #FFA500)
    // All notes must have a priority, defaulting to MEDIUM
    addNote({
      body: '',
      colors: memberToUse ? {
        colorHeader: memberToUse.colorHeader,
        colorBody: memberToUse.colorBody,
        colorText: memberToUse.colorText
      } : DEFAULT_NOTE_COLORS,
      memberId: memberToUse?.id,
      position: {
        x: e.clientX + scrollX,
        y: e.clientY + scrollY
      },
      priority: 'MEDIUM'  // Default to MEDIUM priority (orange #FFA500)
    });
  }, [addNote, activeMember, selectedNote, getMember]);

  // Handle member selection - also deselects any selected note
  const handleActiveMemberChange = useCallback((member: Member | null) => {
    setActiveMember(member);
    setSelectedNote(null); // Deselect note when member changes
  }, []);

  // Filter notes based on active member
  const filteredNotes = useMemo(() => {
    if (activeMember) {
      setQueriedNotes([]);
      setSearchQuery('');
      setSelectedNote(null);
    }
    return notes.filter(note => !activeMember || note.memberId === activeMember.id);
  }, [notes, activeMember]);

  // Handle search result click to select a note
  const handleSearchResultClick = useCallback((note: Note) => {
    setSelectedNote(note);
    setSearchQuery('');
    
    // If the note has a member assigned, set that member as active
    if (note.memberId) {
      const noteMember = getMember(note.memberId);
      if (noteMember) {
        setActiveMember(noteMember);
      }
    }
  }, [getMember]);

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

  // Handle search toggle (deselects note)
  const handleSearchToggle = useCallback((isVisible: boolean) => {
    // If search is being opened, deselect any selected note
    if (isVisible) {
      setSelectedNote(null);
    }
  }, []);

  // Determine which notes to display
  const displayedNotes = useMemo(() => {
    if (selectedNote) {
      // If a note is selected from search, only show that note
      return [selectedNote];
    } else if (queriedNotes.length > 0) {
      // If there are search results, show those
      return queriedNotes;
    } else {
      // Otherwise show filtered notes based on active member
      return filteredNotes;
    }
  }, [selectedNote, queriedNotes, filteredNotes]);

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
          onToggle={handleSearchToggle}
        />
      )}
      {displayedNotes.map((note: Note) => (
        <NoteCard 
          key={note.$id} 
          note={note} 
          onDelete={() => deleteNote(note.$id)} 
          id={`note-${note.$id}`}
        />
      ))}
      <Controls
        onActiveMemberChange={handleActiveMemberChange}
        activeMember={activeMember}
        onSearchToggle={handleSearchToggle}
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

const NoteDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

export default NotesPage;