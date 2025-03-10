import React, { useState } from 'react';
import styled from 'styled-components';
import { Note } from '../utils/types';

interface SearchTaskProps {
  notes: Note[];
  onSearch: (filteredNotes: Note[]) => void;
}

const SearchTask: React.FC<SearchTaskProps> = ({ notes, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (!query.trim()) {
      onSearch([]); // Clear queriedNotes when search is empty
    } else {
      onSearch(notes.filter(note => note.body.toLowerCase().includes(query.toLowerCase())));
    }
  };
  

  return (
    <SearchContainer onClick={(e) => e.stopPropagation()}>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        autoFocus
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: 10000;
  background: #35363e;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const SearchInput = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background: #2a2b32;
  color: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4d79ff;
  }
`;

export default SearchTask;